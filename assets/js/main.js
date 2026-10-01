/* UAB „Elile“: maketo interaktyvumas.
   Atkartoja Salient elgseną: antraštės sumažėjimas, Split Line Heading, Highlighted Text,
   kolonų animacijos, paralaksas, Milestone skaičiai, Toggles, Tabs, Post Grid filtrai, žemėlapis.
   Laisvų patalpų sąrašai, skaičiai ir žymekliai generuojami iš data.js, todėl
   „Patalpų valdymo“ skydelyje pažymėjus patalpą išnuomota, ji dingsta visur, kaip WordPress'e. */
(() => {
  'use strict';

  const D = window.ELILE;
  const doc = document;
  const root = doc.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = doc) => c.querySelector(s);
  const $$ = (s, c = doc) => Array.from(c.querySelectorAll(s));
  const params = new URLSearchParams(location.search);

  /* ---------- Būsena (tik šioje naršyklėje) ---------- */
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* privatus langas: būsena neišsaugoma */ }
    }
  };
  const state = {
    rented: new Set(store.get('elile.rented', [])),
    examples: store.get('elile.examples', true),
    exampleTags: store.get('elile.exampleTags', true)
  };
  const saveState = () => {
    store.set('elile.rented', [...state.rented]);
    store.set('elile.examples', state.examples);
    store.set('elile.exampleTags', state.exampleTags);
  };

  /* ---------- Formatavimas ---------- */
  const nf0 = new Intl.NumberFormat('lt-LT', { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat('lt-LT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const nf2 = new Intl.NumberFormat('lt-LT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtArea = (a) => (Number.isInteger(a) ? nf0.format(a) : nf2.format(a)) + ' m²';
  const fmtPrice = (p) => nf2.format(p) + ' €';
  const monthly = (u) => nf0.format(Math.round(u.area * u.price));
  const plural = (n, forms) => {
    const n10 = n % 10, n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return forms[0];
    if (n10 >= 2 && n10 <= 9 && (n100 < 11 || n100 > 19)) return forms[1];
    return forms[2];
  };
  const freePhrase = (n) => (n === 0 ? 'Laisvų patalpų nėra' : `${n} ${plural(n, ['laisva patalpa', 'laisvos patalpos', 'laisvų patalpų'])}`);
  const unitsWord = (n) => `${n} ${plural(n, ['patalpa', 'patalpos', 'patalpų'])}`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const haversine = (a, b) => {
    const R = 6371000, rad = Math.PI / 180;
    const dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  };
  const fmtDist = (m) => (m < 450 ? `${Math.round(m / 10) * 10} m` : `${nf1.format(m / 1000)} km`);

  /* ---------- Duomenys ---------- */
  const objById = (id) => D.objects.find((o) => o.id === id);
  const unitById = (id) => D.units.find((u) => u.id === id);
  const isShown = (u) => state.examples || !u.example;
  const isFree = (u) => isShown(u) && !state.rented.has(u.id);
  const freeUnits = (objectId) => D.units
    .filter((u) => isFree(u) && (!objectId || u.object === objectId))
    .sort((a, b) => b.updated.localeCompare(a.updated));
  const freeCount = (objectId) => freeUnits(objectId).length;
  const routeUrl = (o) => `https://www.google.com/maps/dir/?api=1&destination=${o.lat},${o.lng}`;

  /* ---------- Šablonai ---------- */
  const statusHTML = (u) => (u.from === 'Laisva dabar'
    ? '<span class="status">Laisva dabar</span>'
    : `<span class="status status--soon">${esc(u.from)}</span>`);
  const exampleTag = (u) => (u.example ? '<span class="tag tag--example" title="Pavyzdinė patalpa maketui">Pavyzdys</span>' : '');
  const objStatusHTML = (id) => {
    const n = freeCount(id);
    return n ? `<span class="status status--live">${freePhrase(n)}</span>` : '<span class="status status--off">Laisvų patalpų nėra</span>';
  };
  const unitAlt = (u) => `${u.title}, ${fmtArea(u.area).replace(' ', ' ')}, ${objById(u.object).name}`;

  const unitCardHTML = (u, i = 0) => {
    const o = objById(u.object);
    return `<article class="unit-card" data-unit="${u.id}" data-object="${u.object}" style="--i:${i}">
      <a class="unit-card__link" href="patalpa.html?id=${u.id}">
        <div class="unit-card__media">
          <img src="${u.photos[0]}" alt="${esc(unitAlt(u))}" loading="lazy" decoding="async">
          <span class="unit-card__go" aria-hidden="true"><i class="ph ph-arrow-up-right"></i></span>
        </div>
        <div class="unit-card__body">
          <div class="unit-card__top"><span class="tag">${esc(u.type)}</span>${statusHTML(u)}${exampleTag(u)}</div>
          <h3 class="unit-card__title">${fmtArea(u.area)}<small>${u.floor} aukštas</small></h3>
          <span class="unit-card__name">${esc(u.title)}</span>
          <span class="unit-card__addr"><i class="ph ph-map-pin" aria-hidden="true"></i>${esc(o.name)}, ${esc(o.city)}</span>
          <div class="unit-card__foot">
            <span class="unit-card__price">${fmtPrice(u.price)}/m² <small>+ PVM</small></span>
            <span class="unit-card__month">≈ ${monthly(u)} €/mėn.</span>
          </div>
        </div>
      </a>
    </article>`;
  };

  const rowCardHTML = (u, i = 0) => {
    const o = objById(u.object);
    return `<article class="row-card" data-unit="${u.id}" data-object="${u.object}" style="--i:${i}">
      <div class="row-card__media"><img src="${u.photos[0]}" alt="${esc(unitAlt(u))}" loading="lazy" decoding="async"></div>
      <div class="row-card__body">
        <div class="unit-card__top"><span class="tag">${esc(u.type)}</span>${statusHTML(u)}${exampleTag(u)}</div>
        <h3 class="row-card__title"><strong>${fmtArea(u.area)}</strong><span>${esc(u.title)}, ${u.floor} aukštas</span></h3>
        <p class="row-card__sum">${esc(u.summary)}</p>
        <div class="row-card__foot">
          <span class="unit-card__price">${fmtPrice(u.price)}/m² <small>+ PVM</small></span>
          <span class="muted">≈ ${monthly(u)} €/mėn.</span>
          <a class="row-card__link" href="patalpa.html?id=${u.id}" aria-label="Peržiūrėti: ${esc(unitAlt(u))}"><span class="row-card__go" aria-hidden="true"><i class="ph ph-arrow-up-right"></i></span></a>
        </div>
      </div>
    </article>`;
  };

  let formSeq = 0;
  const notifyInlineHTML = (objectId) => {
    const id = `nf-${++formSeq}`;
    return `<form class="notify-inline" data-notify-form novalidate>
      <input type="hidden" name="objektas" value="${objectId || 'visi'}">
      <div class="field"><label class="visually-hidden" for="${id}">El. paštas</label>
        <input id="${id}" type="email" name="email" placeholder="jusu@imone.lt" autocomplete="email" required>
        <span class="field__error">Įrašykite el. pašto adresą.</span></div>
      <button class="btn btn--ink btn--sm" type="submit">Gauti pranešimus</button>
      <p class="notify-inline__msg" role="status" aria-live="polite"></p>
    </form>`;
  };

  const emptyHTML = (objectId, filtered) => {
    const o = objectId ? objById(objectId) : null;
    if (filtered) {
      return `<div class="empty-card"><span class="empty-card__icon"><i class="ph ph-funnel-simple"></i></span>
        <h3>Pagal pasirinktus filtrus patalpų nerasta</h3>
        <p>Pabandykite pakeisti paskirtį ar plotą, arba peržiūrėkite visas laisvas patalpas.</p>
        <button class="linklike" type="button" data-clear-filters>Išvalyti filtrus</button></div>`;
    }
    return `<div class="empty-card"><span class="empty-card__icon"><i class="ph ph-bell-ringing"></i></span>
      <h3>${o ? `${esc(o.name)} šiuo metu laisvų patalpų nėra` : 'Šiuo metu laisvų patalpų nėra'}</h3>
      <p>Palikite el. paštą ir pranešime, kai ${o ? 'šiame pastate' : 'mūsų pastatuose'} atsilaisvins patalpos.</p>
      ${notifyInlineHTML(objectId)}</div>`;
  };

  /* ---------- Bendri atnaujinimai: skaičiai, statusai ---------- */
  const renderCounts = () => {
    $$('[data-count]').forEach((el) => {
      const key = el.dataset.count;
      const n = freeCount(key === 'all' ? null : key);
      const f = el.dataset.countFormat || 'number';
      if (f === 'phrase') el.textContent = freePhrase(n);
      else if (f === 'units') el.textContent = unitsWord(n);
      else if (f === 'word') el.textContent = plural(n, ['laisva patalpa', 'laisvos patalpos', 'laisvų patalpų']);
      else el.textContent = String(n);
    });
    $$('[data-status-for]').forEach((el) => { el.innerHTML = objStatusHTML(el.dataset.statusFor); });
    root.classList.toggle('hide-example-tags', !state.exampleTags);
  };

  /* ---------- Hero: naujausia laisva patalpa ---------- */
  const renderHeroCard = () => {
    const el = $('[data-render="hero-card"]');
    if (!el) return;
    const u = freeUnits()[0];
    el.classList.toggle('live-card--empty', !u);
    if (!u) {
      el.href = '#pranesimai';
      el.innerHTML = `<span class="live-card__icon"><i class="ph ph-bell-ringing"></i></span>
        <span><span class="live-card__label">Visos patalpos išnuomotos</span>
        <span class="live-card__title">Gaukite pranešimą, kai atsilaisvins</span></span>`;
      return;
    }
    const o = objById(u.object);
    el.href = `patalpa.html?id=${u.id}`;
    el.innerHTML = `<img class="live-card__img" src="${u.photos[0]}" alt="" loading="eager">
      <span>
        <span class="live-card__label">Naujausia laisva patalpa</span>
        <span class="live-card__title">${esc(u.title)}, ${fmtArea(u.area)}</span>
        <span class="live-card__meta">${esc(o.name)}, ${u.floor} aukštas</span>
        <span class="live-card__row"><span class="live-card__price">${fmtPrice(u.price)}/m² <small>+ PVM</small></span><span class="live-card__go" aria-hidden="true"><i class="ph ph-arrow-up-right"></i></span></span>
      </span>`;
  };

  /* ---------- Pradžios puslapio tinklelis su filtrais ---------- */
  let homeFilter = 'all';
  const renderUnitGrids = (animate) => {
    $$('[data-render="unit-grid"]').forEach((grid) => {
      const scope = grid.dataset.object || (grid.dataset.filterable ? homeFilter : 'all');
      const objectId = scope === 'all' ? null : scope;
      const exclude = grid.dataset.exclude;
      const limit = parseInt(grid.dataset.limit || '0', 10);
      let list = freeUnits(objectId).filter((u) => u.id !== exclude);
      if (grid.dataset.prefer) {
        const pref = grid.dataset.prefer;
        list = list.sort((a, b) => (b.object === pref) - (a.object === pref));
      }
      if (limit) list = list.slice(0, limit);
      if (!list.length) {
        if (grid.dataset.hideEmpty) { grid.closest('[data-hide-when-empty]')?.setAttribute('hidden', ''); return; }
        grid.innerHTML = emptyHTML(objectId, false);
      } else {
        grid.closest('[data-hide-when-empty]')?.removeAttribute('hidden');
        grid.innerHTML = list.map((u, i) => unitCardHTML(u, i)).join('');
      }
      if (animate) grid.classList.add('is-animated');
    });
    $$('[data-filter-chips] [data-filter]').forEach((chip) => {
      const key = chip.dataset.filter;
      chip.setAttribute('aria-pressed', String(key === homeFilter));
      const c = chip.querySelector('.chip__count');
      if (c) c.textContent = freeCount(key === 'all' ? null : key);
    });
    $$('[data-all-link]').forEach((a) => {
      a.href = homeFilter === 'all' ? 'patalpos.html' : `patalpos.html?objektas=${homeFilter}`;
    });
  };
  doc.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-filter-chips] [data-filter]');
    if (!chip) return;
    homeFilter = chip.dataset.filter;
    renderUnitGrids(true);
  });

  /* ---------- Leaflet žemėlapiai ---------- */
  // OpenStreetMap plytelės, kaip Salient Map elemente (Map Type: Leaflet); spalvos sušvelnintos CSS filtru
  const TILE = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  const ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> bendraautoriai';
  const maps = [];
  const hasLeaflet = () => typeof window.L !== 'undefined';

  const makeMap = (el, options = {}) => {
    const map = L.map(el, Object.assign({ zoomControl: false, scrollWheelZoom: false, attributionControl: true }, options));
    L.tileLayer(TILE, { attribution: ATTR, maxZoom: 19 }).addTo(map);
    if (options.zoom !== false && options.dragging !== false) L.control.zoom({ position: 'bottomright' }).addTo(map);
    // ratuku žemėlapis priartinamas tik paspaudus ant jo, kad netrukdytų slinkti puslapio
    el.addEventListener('click', () => map.scrollWheelZoom.enable(), { once: true });
    return map;
  };
  const pinIcon = (o, count, active) => L.divIcon({
    className: 'pin-icon', iconSize: [0, 0], iconAnchor: [0, 0],
    html: `<span class="pin-dot"></span><span class="pin${count ? '' : ' is-empty'}${active ? ' is-active' : ''}" data-pin="${o.id}"><span>${esc(o.name)}</span><span class="pin__count" aria-label="${esc(freePhrase(count))}">${count}</span></span>`
  });
  const poiIcon = (p, active) => L.divIcon({
    className: 'poi-icon', iconSize: [0, 0], iconAnchor: [0, 0],
    html: `<span class="poi${active ? ' is-active' : ''}"><i class="ph ${p.icon}"></i></span>`
  });
  const popupHTML = (o, count) => `<div class="popup"><img src="${o.photo}" alt=""><div class="popup__body">
      <strong>${esc(o.name)}</strong><span>${esc(o.district)}</span>
      ${count ? `<span class="status status--live">${freePhrase(count)}</span>` : '<span class="status status--off">Laisvų patalpų nėra</span>'}
      <p style="margin:10px 0 0"><a class="link-u" href="objektas.html?id=${o.id}">Apie pastatą <i class="ph ph-arrow-right"></i></a></p>
    </div></div>`;

  const whenNear = (el, cb) => {
    if (!('IntersectionObserver' in window)) { cb(); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((en) => en.isIntersecting)) { io.disconnect(); cb(); }
    }, { rootMargin: '400px 0px' });
    io.observe(el);
  };

  const initOverviewMap = (el) => {
    const map = makeMap(el);
    const markers = {};
    const counts = () => Object.fromEntries(D.objects.map((o) => [o.id, freeCount(o.id)]));
    let active = null;
    const wide = () => window.innerWidth > 767;
    const fit = () => {
      const b = L.latLngBounds(D.objects.map((o) => [o.lat, o.lng]));
      map.fitBounds(b, wide() ? { paddingTopLeft: [440, 90], paddingBottomRight: [80, 90] } : { paddingTopLeft: [96, 70], paddingBottomRight: [96, 40] });
    };
    const setActive = (id) => {
      active = id;
      const c = counts();
      D.objects.forEach((o) => {
        markers[o.id].setIcon(pinIcon(o, c[o.id], o.id === id));
        markers[o.id].setZIndexOffset(o.id === id ? 1000 : 0);
      });
      $$('.map-obj', el.closest('.mapsec__wrap') || doc).forEach((b) => b.classList.toggle('is-active', b.dataset.focus === id));
    };
    D.objects.forEach((o) => {
      const m = L.marker([o.lat, o.lng], { icon: pinIcon(o, freeCount(o.id), false), title: o.name, riseOnHover: true }).addTo(map);
      m.bindPopup(() => popupHTML(o, freeCount(o.id)), { offset: [0, -44], closeButton: true, autoPanPadding: [40, 40] });
      m.on('click', () => setActive(o.id));
      markers[o.id] = m;
    });
    fit();
    const wrap = el.closest('.mapsec__wrap');
    if (wrap) {
      $$('.map-obj', wrap).forEach((btn) => {
        btn.addEventListener('click', () => {
          const o = objById(btn.dataset.focus);
          setActive(o.id);
          const target = map.project([o.lat, o.lng], 15);
          const shift = wide() ? L.point(-190, 0) : L.point(0, 0);
          map.flyTo(map.unproject(target.add(shift), 15), 15, { duration: reduceMotion ? 0 : 1.1 });
          map.once('moveend', () => markers[o.id].openPopup());
        });
        btn.addEventListener('mouseenter', () => { if (!active) markers[btn.dataset.focus].setZIndexOffset(1000); });
      });
      $$('[data-map-reset]', wrap).forEach((b) => b.addEventListener('click', () => { map.closePopup(); setActive(null); fit(); }));
    }
    maps.push({ refresh: () => setActive(active), map });
  };

  const initObjectMap = (el) => {
    const o = objById(el.dataset.object) || D.objects[0];
    const map = makeMap(el);
    const main = L.marker([o.lat, o.lng], { icon: pinIcon(o, freeCount(o.id), true), zIndexOffset: 1000, title: o.name }).addTo(map);
    main.bindPopup(() => popupHTML(o, freeCount(o.id)), { offset: [0, -44] });
    const poiMarkers = (o.poi || []).map((p) => {
      const m = L.marker([p.lat, p.lng], { icon: poiIcon(p, false), title: p.name }).addTo(map);
      m.bindTooltip(`<strong>${esc(p.name)}</strong><br>${fmtDist(haversine(o, p))}`, { direction: 'top', offset: [0, -18] });
      return m;
    });
    const pts = [[o.lat, o.lng], ...(o.poi || []).map((p) => [p.lat, p.lng])];
    const fit = () => map.fitBounds(L.latLngBounds(pts), { padding: [70, 70], maxZoom: 16 });
    fit();
    const list = $(`[data-poi-list="${o.id}"]`);
    if (list) {
      $$('[data-poi]', list).forEach((btn) => {
        const idx = +btn.dataset.poi;
        const m = poiMarkers[idx];
        const p = o.poi[idx];
        btn.addEventListener('mouseenter', () => { m.setIcon(poiIcon(p, true)); m.openTooltip(); });
        btn.addEventListener('mouseleave', () => { m.setIcon(poiIcon(p, false)); m.closeTooltip(); });
        btn.addEventListener('click', () => { map.flyTo([p.lat, p.lng], 16, { duration: reduceMotion ? 0 : 0.9 }); m.openTooltip(); });
      });
    }
    maps.push({ refresh: () => main.setIcon(pinIcon(o, freeCount(o.id), true)), map, fit });
  };

  const initMiniMap = (el) => {
    const o = objById(el.dataset.object) || D.objects[0];
    const map = makeMap(el, { dragging: false, zoom: false, doubleClickZoom: false, boxZoom: false, keyboard: false, touchZoom: false, attributionControl: true });
    map.setView([o.lat, o.lng], 15);
    const m = L.marker([o.lat, o.lng], { icon: pinIcon(o, freeCount(o.id), true), interactive: false }).addTo(map);
    maps.push({ refresh: () => m.setIcon(pinIcon(o, freeCount(o.id), true)), map });
  };

  let listingMapApi = null;
  const initListingMap = (el) => {
    const map = makeMap(el);
    const markers = {};
    let hl = null;
    const counts = () => Object.fromEntries(D.objects.map((o) => [o.id, listingUnits(o.id).length]));
    const paint = () => {
      const c = counts();
      D.objects.forEach((o) => {
        markers[o.id].setIcon(pinIcon(o, c[o.id], o.id === hl));
        markers[o.id].setZIndexOffset(o.id === hl ? 1000 : 0);
      });
    };
    D.objects.forEach((o) => {
      const m = L.marker([o.lat, o.lng], { icon: pinIcon(o, 0, false), title: o.name }).addTo(map);
      m.bindPopup(() => popupHTML(o, freeCount(o.id)), { offset: [0, -44] });
      m.on('mouseover', () => highlightObject(o.id, true));
      m.on('mouseout', () => highlightObject(null, true));
      m.on('click', () => {
        const g = $(`[data-group="${o.id}"]`);
        if (g && window.innerWidth > 1080) g.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
      markers[o.id] = m;
    });
    const fitTo = (id, animate = true) => {
      if (id && id !== 'all') {
        const o = objById(id);
        if (animate && !reduceMotion) map.flyTo([o.lat, o.lng], 15, { duration: 0.9 }); else map.setView([o.lat, o.lng], 15);
        return;
      }
      map.fitBounds(L.latLngBounds(D.objects.map((o) => [o.lat, o.lng])), { padding: [80, 80], animate: animate && !reduceMotion });
    };
    fitTo(listingState.object, false);
    paint();
    listingMapApi = { map, setHl: (id) => { hl = id; paint(); }, paint, fitTo };
    maps.push({ refresh: paint, map });
  };

  const initUnitMap = (el) => {
    const o = objById(el.dataset.object) || D.objects[0];
    const map = makeMap(el);
    map.setView([o.lat, o.lng], 15);
    const m = L.marker([o.lat, o.lng], { icon: pinIcon(o, freeCount(o.id), true) }).addTo(map);
    (o.poi || []).slice(0, 4).forEach((p) => {
      L.marker([p.lat, p.lng], { icon: poiIcon(p, false), title: p.name }).addTo(map)
        .bindTooltip(`<strong>${esc(p.name)}</strong><br>${fmtDist(haversine(o, p))}`, { direction: 'top', offset: [0, -18] });
    });
    maps.push({ refresh: () => m.setIcon(pinIcon(o, freeCount(o.id), true)), map });
  };

  const initMaps = () => {
    if (!hasLeaflet()) return;
    $$('[data-map]').forEach((el) => {
      const type = el.dataset.map;
      const run = () => {
        if (el._elileMap) return;
        el._elileMap = true;
        if (type === 'overview') initOverviewMap(el);
        else if (type === 'object') initObjectMap(el);
        else if (type === 'mini') initMiniMap(el);
        else if (type === 'listing') initListingMap(el);
        else if (type === 'unit') initUnitMap(el);
      };
      if (type === 'mini' || type === 'listing') run(); else whenNear(el, run);
    });
  };
  const refreshMaps = () => maps.forEach((m) => m.refresh && m.refresh());
  const invalidateMaps = () => maps.forEach((m) => m.map && m.map.invalidateSize());

  /* ---------- Laisvų patalpų puslapis ---------- */
  const listingState = {
    object: objById(params.get('objektas')) ? params.get('objektas') : 'all',
    type: 'all',
    area: 'all',
    sort: 'new'
  };
  const areaMatch = (u, key) => {
    if (key === 'lt50') return u.area < 50;
    if (key === '50-150') return u.area >= 50 && u.area <= 150;
    if (key === 'gt150') return u.area > 150;
    return true;
  };
  const listingUnits = (objectId) => {
    let list = freeUnits(objectId)
      .filter((u) => listingState.type === 'all' || u.type === listingState.type)
      .filter((u) => areaMatch(u, listingState.area));
    if (listingState.sort === 'area') list = list.sort((a, b) => a.area - b.area);
    if (listingState.sort === 'price') list = list.sort((a, b) => a.price - b.price);
    return list;
  };
  const filtersActive = () => listingState.type !== 'all' || listingState.area !== 'all';

  function highlightObject(id, fromMap) {
    $$('[data-unit]').forEach((c) => c.classList.toggle('is-hl', !!id && c.dataset.object === id));
    if (!fromMap && listingMapApi) listingMapApi.setHl(id);
  }

  const renderListing = (animate) => {
    const host = $('[data-render="listing"]');
    if (!host) return;
    const objects = listingState.object === 'all' ? D.objects : [objById(listingState.object)];
    let total = 0;
    host.innerHTML = objects.map((o) => {
      const list = listingUnits(o.id);
      total += list.length;
      const allFree = freeCount(o.id);
      return `<section class="group" data-group="${o.id}" aria-labelledby="g-${o.id}">
        <header class="group__head">
          <img src="${o.photo}" alt="" loading="lazy">
          <div class="group__text">
            <h2 id="g-${o.id}">${esc(o.name)}</h2>
            <span class="group__sub">${esc(o.district)}, ${esc(o.kind.toLowerCase())}</span>
            ${objStatusHTML(o.id)}
          </div>
          <a class="link-u group__link" href="objektas.html?id=${o.id}">Apie pastatą <i class="ph ph-arrow-right"></i></a>
        </header>
        <div class="rows${animate ? ' is-animated' : ''}">${list.length ? list.map((u, i) => rowCardHTML(u, i)).join('') : emptyHTML(o.id, allFree > 0 && filtersActive())}</div>
      </section>`;
    }).join('');
    $$('[data-result-count]').forEach((el) => { el.textContent = unitsWord(total); });
    $$('[data-listing-object] button').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.value === listingState.object));
      const c = b.querySelector('.chip__count');
      if (c) c.textContent = freeCount(b.dataset.value === 'all' ? null : b.dataset.value);
    });
    $$('[data-clear-all]').forEach((b) => { b.hidden = !filtersActive() && listingState.object === 'all'; });
    // kortelės ir žymekliai paryškinami kartu
    $$('.row-card', host).forEach((card) => {
      card.addEventListener('mouseenter', () => highlightObject(card.dataset.object));
      card.addEventListener('mouseleave', () => highlightObject(null));
    });
    if (listingMapApi) listingMapApi.paint();
    bindNotifyForms(host);
  };

  const initListingControls = () => {
    const bar = $('[data-listing-controls]');
    if (!bar) return;
    $$('[data-listing-object] button', bar).forEach((b) => b.addEventListener('click', () => {
      listingState.object = b.dataset.value;
      const url = new URL(location.href);
      if (listingState.object === 'all') url.searchParams.delete('objektas'); else url.searchParams.set('objektas', listingState.object);
      history.replaceState(null, '', url);
      renderListing(true);
      if (listingMapApi) listingMapApi.fitTo(listingState.object);
    }));
    $$('select[data-listing]', bar).forEach((s) => {
      s.value = listingState[s.dataset.listing];
      s.addEventListener('change', () => { listingState[s.dataset.listing] = s.value; renderListing(true); });
    });
    const clearAll = () => {
      listingState.type = 'all'; listingState.area = 'all'; listingState.object = 'all';
      $$('select[data-listing]', bar).forEach((s) => { if (s.dataset.listing !== 'sort') s.value = 'all'; });
      history.replaceState(null, '', location.pathname);
      renderListing(true);
      if (listingMapApi) listingMapApi.fitTo('all');
    };
    $$('[data-clear-all]').forEach((b) => b.addEventListener('click', clearAll));
    doc.addEventListener('click', (e) => { if (e.target.closest('[data-clear-filters]')) clearAll(); });
    $$('[data-view] button').forEach((b) => b.addEventListener('click', () => {
      const listing = $('.listing');
      const showMap = b.dataset.value === 'map';
      listing.classList.toggle('show-map', showMap);
      $$('[data-view] button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      if (showMap) setTimeout(() => { invalidateMaps(); if (listingMapApi) listingMapApi.fitTo(listingState.object, false); }, 60);
    }));
  };

  /* ---------- Objekto puslapis ---------- */
  const renderObjectPage = () => {
    const host = $('[data-render="object"]');
    if (!host) return;
    const o = objById(params.get('id')) || D.objects[0];
    const other = D.objects.find((x) => x.id !== o.id);
    doc.title = `${o.name}, Kaunas | Patalpų nuoma | UAB „Elile“`;
    $$('[data-object-select]').forEach((s) => { s.value = o.id; });
    $$('a[data-mock-object]').forEach((a) => a.setAttribute('aria-current', a.dataset.mockObject === o.id ? 'page' : 'false'));
    const n = freeCount(o.id);
    const poiItems = (o.poi || []).map((p, i) => `<button class="poi-item" type="button" data-poi="${i}">
        <i class="ph ${p.icon}" aria-hidden="true"></i><strong>${esc(p.name)}</strong><span>${esc(p.note)}</span><b>${fmtDist(haversine(o, p))}</b></button>`).join('');
    const photos = o.id === 'donelaicio-33' ? unitById('donelaicio-33-v-4082').photos : [];
    host.innerHTML = `
      <section class="obj-hero">
        <div class="container">
          <ol class="crumbs" aria-label="Kelias">
            <li><a href="index.html">Pradžia</a></li><li><a href="index.html#objektai">Objektai</a></li><li aria-current="page">${esc(o.name)}</li>
          </ol>
          <div class="obj-hero__grid">
            <div>
              <span data-status-for="${o.id}">${objStatusHTML(o.id)}</span>
              <h1 data-split>${esc(o.name)}</h1>
              <p class="obj-hero__sub" data-reveal style="--d:200ms">${esc(o.city)}, ${esc(o.district)}</p>
              <p class="lead" data-reveal style="--d:300ms">${esc(o.lead)}</p>
              <div class="obj-hero__actions" data-reveal style="--d:400ms">
                <a class="btn btn--green" href="#laisvos"><span>Laisvos patalpos (<span data-count="${o.id}">${n}</span>)</span><span class="btn__icon"><i class="ph ph-arrow-down"></i><i class="ph ph-arrow-down"></i></span></a>
                <a class="btn btn--ghost" href="${routeUrl(o)}" target="_blank" rel="noopener">Maršrutas</a>
              </div>
            </div>
            <div class="cascade" data-reveal="fade">
              <span class="cascade__shape" data-grow style="--d:300ms"></span>
              <div class="cascade__main" data-mask>
                <div class="px" data-px="0.08"><img src="${o.photo}" alt="${esc(o.name)} pastatas, Kaunas"></div>
              </div>
              <div class="cascade__sub" data-px="-0.06">
                <div class="mini-map" data-map="mini" data-object="${o.id}" aria-label="${esc(o.name)} žemėlapyje"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section--tight" aria-label="Svarbiausi faktai">
        <div class="container">
          <div class="facts">
            ${o.highlights.map((h, i) => `<div class="fact" data-reveal style="--d:${i * 90}ms"><i class="ph ${h.icon}" aria-hidden="true"></i><strong>${esc(h.value)}</strong><span>${esc(h.label)}</span></div>`).join('')}
            <a class="fact fact--green" href="#laisvos" data-reveal style="--d:270ms"><i class="ph ph-door-open" aria-hidden="true"></i><strong data-count="${o.id}">${n}</strong><span><span data-count="${o.id}" data-count-format="word"></span> šiame pastate</span></a>
          </div>
        </div>
      </section>

      <section class="section" id="laisvos">
        <div class="container">
          <div class="mapsec__head">
            <h2 data-split>Laisvos patalpos</h2>
            <p class="lead" data-reveal>Kai patalpos išnuomojamos, jos iš sąrašo dingsta. Atsilaisvinusios patalpos atsiranda čia pat.</p>
          </div>
          <div class="unit-grid unit-grid--3" data-render="unit-grid" data-object="${o.id}" data-reveal="fade"></div>
        </div>
      </section>

      <section class="section section--white">
        <div class="container two-col">
          <div class="two-col__aside">
            <h2 data-split>Apie pastatą</h2>
            ${o.about.map((p, i) => `<p class="lead" data-reveal style="--d:${150 + i * 100}ms">${esc(p)}</p>`).join('')}
          </div>
          <div>
            <h3 class="services-title" data-reveal>Komunikacijos ir paslaugos</h3>
            <div class="services">
              ${o.services.map((s, i) => `<div class="service" data-reveal style="--d:${i * 60}ms"><i class="ph ${s.icon}" aria-hidden="true"></i>${esc(s.label)}</div>`).join('')}
            </div>
            ${photos.length ? `<div class="gallery-strip" data-reveal>${photos.slice(0, 3).map((src, i) => `<button class="gallery__item" type="button" data-lightbox="obj" data-index="${i}" data-src="${src}"><img src="${src}" alt="Patalpų nuotrauka ${i + 1}" loading="lazy"></button>`).join('')}</div>` : ''}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="mapsec__head">
            <h2 data-split>Vieta ir susisiekimas</h2>
            <p class="lead" data-reveal>Atstumai tiesia linija nuo pastato, pagal OpenStreetMap duomenis.</p>
          </div>
          <div class="location">
            <div class="location__map" data-map="object" data-object="${o.id}" data-reveal="fade" aria-label="${esc(o.name)} ir aplinkinės vietos žemėlapyje"></div>
            <div class="poi-list" data-poi-list="${o.id}">
              ${poiItems}
              <div class="route-links"><a class="btn btn--ink btn--sm btn--has-icon" href="${routeUrl(o)}" target="_blank" rel="noopener"><span>Maršrutas Google Maps</span><span class="btn__icon"><i class="ph ph-arrow-up-right"></i><i class="ph ph-arrow-up-right"></i></span></a></div>
            </div>
          </div>
        </div>
      </section>

      ${o.ev ? `<section class="section--tight">
        <div class="container">
          <div class="ev" data-reveal>
            <div class="ev__media"><img src="https://images.pexels.com/photos/3846205/pexels-photo-3846205.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Elektromobilis įkraunamas prie įkrovimo stotelės" loading="lazy"></div>
            <div class="ev__body">
              <span class="ev__icon"><i class="ph ph-charging-station"></i></span>
              <h2>Elektromobilio įkrovimas prie pastato</h2>
              <p>Jei jūsų komandai ar klientams aktualu įkrauti elektromobilius, aptarsime galimybę įrengti įkrovimo prieigą prie ${esc(o.name)} pastato.</p>
              <p><a class="link-u" href="#kontaktai" data-prefill="Domina elektromobilio įkrovimo prieiga prie ${esc(o.name)} pastato.">Paklausti apie įkrovimą <i class="ph ph-arrow-right"></i></a></p>
            </div>
          </div>
        </div>
      </section>` : ''}

      <section class="section">
        <div class="container">
          <a class="next-obj" href="objektas.html?id=${other.id}">
            <div>
              <span class="next-obj__label">Kitas pastatas</span>
              <span class="next-obj__name">${esc(other.name)} <span class="round-go" aria-hidden="true"><i class="ph ph-arrow-right"></i></span></span>
              <p>${esc(other.lead)}</p>
              <p data-status-for="${other.id}">${objStatusHTML(other.id)}</p>
            </div>
            <div class="next-obj__media"><img src="${other.photo}" alt="${esc(other.name)} pastatas" loading="lazy"></div>
          </a>
        </div>
      </section>`;
  };

  /* ---------- Patalpos puslapis ---------- */
  const renderUnitPage = () => {
    const host = $('[data-render="unit"]');
    if (!host) return;
    const u = unitById(params.get('id')) || D.units[0];
    const o = objById(u.object);
    doc.title = `${u.title}, ${fmtArea(u.area).replace(' ', ' ')}, ${o.name} | UAB „Elile“`;
    $$('[data-object-select]').forEach((s) => { s.value = o.id; });
    const bar = $('.mobile-bar');

    if (!isFree(u)) {
      bar && (bar.hidden = true);
      doc.body.classList.remove('has-mobile-bar');
      host.innerHTML = `<section class="section"><div class="container">
        <div class="notice">
          <span class="empty-card__icon"><i class="ph ph-key"></i></span>
          <h1>Šios patalpos jau išnuomotos</h1>
          <p class="lead">${esc(u.title)}, ${fmtArea(u.area)}, ${esc(o.name)}. WordPress'e išnuomota patalpa perkeliama į juodraštį, todėl lankytojas pamatytų šį pranešimą arba būtų nukreiptas į laisvų patalpų sąrašą.</p>
          <div class="obj-hero__actions"><a class="btn btn--green" href="patalpos.html"><span>Laisvos patalpos</span><span class="btn__icon"><i class="ph ph-arrow-right"></i><i class="ph ph-arrow-right"></i></span></a>
          <a class="btn btn--ghost" href="objektas.html?id=${o.id}">Apie pastatą</a></div>
        </div></div></section>`;
      return;
    }
    bar && (bar.hidden = false);
    doc.body.classList.add('has-mobile-bar');

    const n = u.photos.length;
    const gClass = n >= 4 ? '' : ` gallery--${Math.min(n, 3)}`;
    const shown = u.photos.slice(0, 5);
    const person = D.people.find((p) => p.main);
    host.innerHTML = `
      <section class="unit-head">
        <div class="container">
          <ol class="crumbs" aria-label="Kelias">
            <li><a href="index.html">Pradžia</a></li><li><a href="patalpos.html">Laisvos patalpos</a></li>
            <li><a href="objektas.html?id=${o.id}">${esc(o.name)}</a></li><li aria-current="page">${fmtArea(u.area)}</li>
          </ol>
          <div class="unit-head__row">
            <div>
              <div class="unit-head__tags" data-reveal><span class="tag">${esc(u.type)}</span>${statusHTML(u)}${exampleTag(u)}</div>
              <h1 data-split>${esc(u.title)}, ${fmtArea(u.area)}</h1>
              <p class="unit-head__addr" data-reveal style="--d:250ms"><i class="ph ph-map-pin" aria-hidden="true"></i>${esc(o.name)}, ${esc(o.city)}, ${u.floor} aukštas <a class="link-u" href="objektas.html?id=${o.id}">Apie pastatą <i class="ph ph-arrow-right"></i></a></p>
            </div>
            <div class="price-block" data-reveal style="--d:300ms">
              <strong>${fmtPrice(u.price)}<small>/m² + PVM</small></strong>
              <span>≈ ${monthly(u)} € per mėnesį + PVM</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Nuotraukos">
        <div class="container">
          <div class="gallery${gClass}" data-mask="up">
            ${shown.map((src, i) => `<button class="gallery__item" type="button" data-lightbox="unit" data-index="${i}" data-src="${src}" aria-label="Didinti nuotrauką ${i + 1} iš ${n}"><img src="${src}" alt="${esc(unitAlt(u))}, nuotrauka ${i + 1}" ${i ? 'loading="lazy"' : ''}>${i === shown.length - 1 && n > 1 ? `<span class="gallery__more"><i class="ph ph-images"></i>Visos nuotraukos (${n})</span>` : ''}</button>`).join('')}
          </div>
        </div>
      </section>

      <div class="container unit-layout">
        <div class="unit-main">
          <section aria-labelledby="apie">
            <h2 id="apie" data-split>Apie patalpas</h2>
            <div class="spec-grid" style="margin-top:24px">
              ${u.specs.map((s, i) => `<div class="spec" data-reveal style="--d:${i * 60}ms"><i class="ph ${s.icon}" aria-hidden="true"></i><span>${esc(s.label)}</span><strong>${esc(s.value)}</strong></div>`).join('')}
            </div>
            <div class="unit-desc" data-reveal>${u.description.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
          </section>

          <section aria-labelledby="daugiau" data-tabs>
            <h2 id="daugiau" data-split>Pastatas ir vieta</h2>
            <div class="tabs__list" role="tablist" aria-label="Papildoma informacija">
              <button role="tab" id="tab-1" aria-controls="panel-1" aria-selected="true">Komunikacijos</button>
              <button role="tab" id="tab-2" aria-controls="panel-2" aria-selected="false" tabindex="-1">Vieta žemėlapyje</button>
              <button role="tab" id="tab-3" aria-controls="panel-3" aria-selected="false" tabindex="-1">Apie pastatą</button>
            </div>
            <div class="tabs__panel" role="tabpanel" id="panel-1" aria-labelledby="tab-1">
              <div class="services">${o.services.map((s) => `<div class="service"><i class="ph ${s.icon}" aria-hidden="true"></i>${esc(s.label)}</div>`).join('')}</div>
            </div>
            <div class="tabs__panel" role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
              <div class="unit-map" data-map="unit" data-object="${o.id}" aria-label="${esc(o.name)} žemėlapyje"></div>
              <p class="muted" style="margin-top:12px;font-size:14px">${(o.poi || []).slice(0, 3).map((p) => `${esc(p.name)}: ${fmtDist(haversine(o, p))}`).join(' / ')}</p>
            </div>
            <div class="tabs__panel" role="tabpanel" id="panel-3" aria-labelledby="tab-3" hidden>
              <a class="building-card" href="objektas.html?id=${o.id}">
                <img src="${o.photo}" alt="${esc(o.name)} pastatas" loading="lazy">
                <div class="building-card__body"><strong>${esc(o.name)}</strong><p>${esc(o.lead)}</p><span class="link-u">Apie pastatą <i class="ph ph-arrow-right"></i></span></div>
              </a>
            </div>
          </section>

          ${o.ev ? `<div class="ev ev--compact" data-reveal>
            <div class="ev__media"><img src="https://images.pexels.com/photos/3846205/pexels-photo-3846205.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" loading="lazy"></div>
            <div class="ev__body">
              <h3>Reikia įkrauti elektromobilį?</h3>
              <p>Jei nuomininkui aktualu, aptarsime galimybę prie pastato įrengti elektromobilio įkrovimo prieigą.</p>
              <p><a class="link-u" href="#apziura" data-prefill="Domina elektromobilio įkrovimo prieiga.">Paklausti apie įkrovimą <i class="ph ph-arrow-right"></i></a></p>
            </div>
          </div>` : ''}
        </div>

        <aside class="booking" id="apziura" aria-label="Užsakyti apžiūrą">
          <div class="booking__card">
            <div class="booking__price"><strong>${fmtPrice(u.price)}</strong><small> /m² + PVM</small><span>≈ ${monthly(u)} € per mėnesį + PVM</span></div>
            <ul class="booking__list">
              <li><span>Plotas</span><strong>${fmtArea(u.area)}</strong></li>
              <li><span>Aukštas</span><strong>${u.floor}</strong></li>
              <li><span>Įsikelti</span><strong>${u.from === 'Laisva dabar' ? 'Nuo dabar' : esc(u.from)}</strong></li>
            </ul>
            <form data-form="booking" novalidate>
              <input type="hidden" name="patalpa" value="${esc(unitAlt(u))}">
              <div class="field"><label for="b-name">Vardas ir pavardė</label><input id="b-name" name="vardas" autocomplete="name" required><span class="field__error">Įrašykite vardą.</span></div>
              <div class="field"><label for="b-phone">Telefonas</label><input id="b-phone" name="telefonas" type="tel" autocomplete="tel" inputmode="tel" required><span class="field__error">Įrašykite telefono numerį.</span></div>
              <fieldset class="field"><legend>Kada patogu apžiūrėti?</legend>
                <div class="choice">
                  <label><input type="radio" name="laikas" value="Šią savaitę" checked><span>Šią savaitę</span></label>
                  <label><input type="radio" name="laikas" value="Kitą savaitę"><span>Kitą savaitę</span></label>
                  <label><input type="radio" name="laikas" value="Susiderinsime"><span>Susiderinsime</span></label>
                </div>
              </fieldset>
              <div class="field"><label for="b-msg">Žinutė <span class="opt">(nebūtina)</span></label><textarea id="b-msg" name="zinute"></textarea></div>
              <button class="btn btn--green btn--block" type="submit"><span>Užsakyti apžiūrą</span><span class="btn__icon"><i class="ph ph-arrow-right"></i><i class="ph ph-arrow-right"></i></span></button>
              <div class="form-success" role="status" aria-live="polite"><i class="ph ph-check-circle"></i><span>Ačiū! Užklausą gavome. ${esc(person.name.split(' ')[0])} susisieks su jumis dėl apžiūros laiko.</span></div>
            </form>
          </div>
          <div class="booking__person">
            <span class="person__avatar">${person.initials}</span>
            <span class="person__text"><strong>${esc(person.name)}</strong><span>${esc(person.role)}</span><a class="person__tel" href="${person.href}">${esc(person.phone)}</a></span>
            <a class="round-call" href="${person.href}" aria-label="Skambinti ${esc(person.phone)}"><i class="ph ph-phone" aria-hidden="true"></i></a>
          </div>
          <div class="share-row"><button type="button" data-copy-link><i class="ph ph-link"></i>Kopijuoti nuorodą</button></div>
        </aside>
      </div>

      <section class="section section--white" data-hide-when-empty>
        <div class="container">
          <div class="mapsec__head">
            <h2 data-split>Kitos laisvos patalpos</h2>
            <a class="link-u" href="patalpos.html">Visos laisvos patalpos <i class="ph ph-arrow-right"></i></a>
          </div>
          <div class="unit-grid unit-grid--3" data-render="unit-grid" data-exclude="${u.id}" data-prefer="${o.id}" data-limit="3" data-hide-empty="1"></div>
        </div>
      </section>`;

    if (bar) {
      bar.innerHTML = `<a class="btn btn--ghost" href="${person.href}"><i class="ph ph-phone"></i>&nbsp;Skambinti</a>
        <a class="btn btn--green" href="#apziura"><span>Užsakyti apžiūrą</span></a>`;
    }
    lightboxSets.unit = u.photos;
  };

  /* ---------- Įėjimo animacijos ---------- */
  let revealIO = null;
  const REVEAL_SEL = '[data-reveal], [data-split], [data-reveal-group], .steps, .hl[data-standalone]';
  const revealProxy = new Map(); // stebimas elementas -> elementai, kuriems pridedama .is-in
  const observeReveals = (scope = doc) => {
    const targets = $$('[data-reveal], [data-mask], [data-grow], [data-split], [data-reveal-group], .steps, .hl[data-standalone]', scope)
      .filter((el) => !el.classList.contains('is-in'));
    if (reduceMotion || !('IntersectionObserver' in window)) { targets.forEach((el) => el.classList.add('is-in')); return; }
    if (!revealIO) {
      revealIO = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          (revealProxy.get(en.target) || []).forEach((el) => el.classList.add('is-in'));
          if (en.target.matches(REVEAL_SEL)) en.target.classList.add('is-in');
          revealProxy.delete(en.target);
          revealIO.unobserve(en.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    }
    targets.forEach((el) => {
      // clip-path ir scale(0) paslepia elementą nuo IntersectionObserver, todėl stebimas jo tėvinis elementas
      if (el.hasAttribute('data-mask') || el.hasAttribute('data-grow')) {
        const proxy = el.parentElement;
        if (!revealProxy.has(proxy)) revealProxy.set(proxy, []);
        revealProxy.get(proxy).push(el);
        revealIO.observe(proxy);
      } else {
        revealIO.observe(el);
      }
    });
  };

  /* ---------- Split Line Heading ---------- */
  const splitHeading = (el) => {
    if (!el.dataset.original) el.dataset.original = el.innerHTML;
    else el.innerHTML = el.dataset.original;
    const tokens = [];
    Array.from(el.childNodes).forEach((node) => {
      if (node.nodeType === 3) {
        node.textContent.split(/([ \t\n\r]+)/).forEach((part) => {
          if (!part) return;
          tokens.push(/^[ \t\n\r]+$/.test(part) ? { space: true } : { text: part });
        });
      } else if (node.nodeType === 1) {
        tokens.push(node.tagName === 'BR' ? { br: true } : { el: node });
      }
    });
    el.textContent = '';
    const words = [];
    tokens.forEach((t) => {
      if (t.space) { el.append(' '); return; }
      const span = doc.createElement('span');
      span.style.display = 'inline-block';
      if (t.br) { const br = doc.createElement('br'); el.append(br); words.push({ br: true }); return; }
      if (t.text) span.textContent = t.text; else span.append(t.el);
      el.append(span);
      words.push(span);
    });
    const lines = [];
    let lastTop = null;
    words.forEach((w) => {
      if (w.br) { lastTop = null; return; }
      const top = w.offsetTop;
      if (lastTop === null || Math.abs(top - lastTop) > 4) { lines.push([]); lastTop = top; }
      lines[lines.length - 1].push(w);
    });
    el.textContent = '';
    lines.forEach((line, i) => {
      const outer = doc.createElement('span');
      outer.className = 'split-line';
      const inner = doc.createElement('span');
      inner.className = 'split-line__inner';
      inner.style.setProperty('--i', i);
      line.forEach((w, j) => {
        if (j) inner.append(' ');
        while (w.firstChild) inner.append(w.firstChild);
      });
      outer.append(inner);
      el.append(outer);
    });
    el.classList.add('is-split');
  };
  const splitAll = (scope = doc) => $$('[data-split]', scope).forEach(splitHeading);
  let lastWidth = window.innerWidth;
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (Math.abs(window.innerWidth - lastWidth) < 2) return;
      lastWidth = window.innerWidth;
      splitAll();
      invalidateMaps();
    }, 180);
  });

  /* ---------- Paralaksas (Salient Parallax / Parallax Scroll) ---------- */
  const initParallax = () => {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    const active = new Set();
    let raf = 0;
    let lastY = null;
    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      if (y !== lastY) {
        lastY = y;
        const vh = window.innerHeight;
        active.forEach((el) => {
          const ref = el.parentElement.getBoundingClientRect();
          const offset = ref.top + ref.height / 2 - vh / 2;
          const speed = parseFloat(el.dataset.px) || 0.1;
          el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
        });
      }
      if (active.size && !doc.hidden) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) active.add(en.target); else active.delete(en.target); });
      lastY = null;
      if (active.size && !raf) raf = requestAnimationFrame(tick);
    }, { rootMargin: '160px 0px' });
    const watch = (scope = doc) => $$('[data-px]', scope).forEach((el) => { if (!el._px) { el._px = true; io.observe(el); } });
    watch();
    doc.addEventListener('visibilitychange', () => { if (!doc.hidden && active.size && !raf) raf = requestAnimationFrame(tick); });
    return watch;
  };

  /* ---------- Milestone skaičiai ---------- */
  const initCounters = () => {
    const els = $$('[data-count-to]');
    const run = (el) => {
      const target = parseFloat(el.dataset.countTo);
      const dec = parseInt(el.dataset.decimals || '0', 10);
      const f = new Intl.NumberFormat('lt-LT', { minimumFractionDigits: dec, maximumFractionDigits: dec });
      if (reduceMotion) { el.textContent = f.format(target); return; }
      const t0 = performance.now();
      const dur = 1800;
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = f.format(target * eased);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      run(en.target);
    }), { threshold: 0.6 });
    els.forEach((el) => io.observe(el));
  };

  /* ---------- Antraštė, meniu, maketo juosta ---------- */
  const initHeader = () => {
    const header = $('.site-header');
    const sentinel = doc.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:90px;pointer-events:none;';
    doc.body.prepend(sentinel);
    if (header && 'IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => header.classList.toggle('is-scrolled', !en.isIntersecting)).observe(sentinel);
    }
    const fab = $('.demo-fab');
    const mockbar = $('.mockbar');
    if (fab && mockbar && 'IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => fab.classList.toggle('is-visible', !en.isIntersecting)).observe(mockbar);
    }

    // „Objektai“ išskleidžiamas meniu
    $$('.nav__item[data-drop]').forEach((item) => {
      const btn = $('.nav__link', item);
      let timer = 0;
      const open = (v) => { item.classList.toggle('is-open', v); btn.setAttribute('aria-expanded', String(v)); };
      item.addEventListener('mouseenter', () => { clearTimeout(timer); open(true); });
      item.addEventListener('mouseleave', () => { timer = setTimeout(() => open(false), 160); });
      btn.addEventListener('click', () => open(!item.classList.contains('is-open')));
      item.addEventListener('focusout', (e) => { if (!item.contains(e.relatedTarget)) open(false); });
      doc.addEventListener('keydown', (e) => { if (e.key === 'Escape') open(false); });
    });

    // Meniu mobiliesiems
    const menu = $('.mobile-menu');
    const burger = $('.burger');
    const setMenu = (v) => {
      if (!menu) return;
      menu.classList.toggle('is-open', v);
      burger && burger.setAttribute('aria-expanded', String(v));
      doc.body.style.overflow = v ? 'hidden' : '';
      if (v) $('.mobile-menu__close', menu)?.focus(); else burger?.focus();
    };
    burger && burger.addEventListener('click', () => setMenu(true));
    menu && $('.mobile-menu__close', menu)?.addEventListener('click', () => setMenu(false));
    menu && $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    doc.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu?.classList.contains('is-open')) setMenu(false); });
  };

  /* ---------- Hero video ---------- */
  const initHeroVideo = () => {
    const video = $('[data-hero-video]');
    const btn = $('[data-video-toggle]');
    if (!video) return;
    let userPaused = reduceMotion || Boolean(navigator.connection && navigator.connection.saveData);
    const sync = () => {
      if (!btn) return;
      const paused = video.paused;
      btn.setAttribute('aria-label', paused ? 'Paleisti fono vaizdo įrašą' : 'Sustabdyti fono vaizdo įrašą');
      btn.innerHTML = `<i class="ph ${paused ? 'ph-play' : 'ph-pause'}" aria-hidden="true"></i>`;
    };
    if (userPaused) { video.removeAttribute('autoplay'); video.pause(); }
    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);
    btn && btn.addEventListener('click', () => {
      if (video.paused) { userPaused = false; video.play().catch(() => {}); } else { userPaused = true; video.pause(); }
    });
    let inView = true;
    const tryPlay = () => { if (inView && !userPaused && !doc.hidden && video.paused) video.play().catch(() => {}); };
    if ('IntersectionObserver' in window) {
      // stebimas konteineris, nes kaukės animacija (clip-path) laikinai paslepia patį video
      new IntersectionObserver(([en]) => {
        inView = en.isIntersecting;
        if (inView) tryPlay(); else video.pause();
      }, { threshold: 0.15 }).observe(video.closest('.hero__media') || video);
    }
    // naršyklė kartais atideda automatinį paleidimą (pvz., kol kortelė nematoma)
    video.addEventListener('canplay', tryPlay);
    doc.addEventListener('visibilitychange', tryPlay);
    window.addEventListener('pageshow', tryPlay);
    setTimeout(tryPlay, 1500);
    sync();
  };

  /* ---------- Toggles ir Tabs ---------- */
  const initToggles = () => {
    $$('.toggle').forEach((t, i) => {
      const btn = $('.toggle__btn', t);
      const panel = $('.toggle__panel', t);
      const id = `toggle-${i}`;
      panel.id = id;
      btn.setAttribute('aria-controls', id);
      btn.setAttribute('aria-expanded', String(t.classList.contains('is-open')));
      btn.addEventListener('click', () => {
        const open = !t.classList.contains('is-open');
        t.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
      });
    });
  };
  const initTabs = (scope = doc) => {
    $$('[data-tabs]', scope).forEach((wrap) => {
      const tabs = $$('[role="tab"]', wrap);
      const select = (tab, focus) => {
        tabs.forEach((t) => {
          const on = t === tab;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
          const panel = doc.getElementById(t.getAttribute('aria-controls'));
          panel.hidden = !on;
          panel.classList.toggle('is-shown', on);
        });
        if (focus) tab.focus();
        setTimeout(invalidateMaps, 30);
      };
      tabs.forEach((t, i) => {
        t.addEventListener('click', () => select(t));
        t.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight') select(tabs[(i + 1) % tabs.length], true);
          if (e.key === 'ArrowLeft') select(tabs[(i - 1 + tabs.length) % tabs.length], true);
        });
      });
    });
  };

  /* ---------- Formos (maketas duomenų nesiunčia) ---------- */
  const validate = (form) => {
    let ok = true;
    $$('[required]', form).forEach((input) => {
      const field = input.closest('.field');
      let valid = input.value.trim().length > 0;
      if (valid && input.type === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
      if (valid && input.type === 'tel') valid = input.value.replace(/\D/g, '').length >= 6;
      field && field.classList.toggle('has-error', !valid);
      input.setAttribute('aria-invalid', String(!valid));
      if (!valid && ok) { input.focus(); ok = false; }
    });
    return ok;
  };
  const bindNotifyForms = (scope = doc) => {
    $$('[data-notify-form]', scope).forEach((form) => {
      if (form._bound) return;
      form._bound = true;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validate(form)) return;
        const obj = form.querySelector('[name="objektas"]');
        const o = obj && objById(obj.value);
        const msg = $('.notify-inline__msg, .notify-form__msg', form);
        if (msg) msg.textContent = `Ačiū! Pranešime, kai ${o ? `${o.name} pastate` : 'mūsų pastatuose'} atsilaisvins patalpos.`;
        form.reset();
      });
    });
  };
  const initForms = () => {
    $$('[data-form]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validate(form)) return;
        const ok = $('.form-success', form);
        ok && ok.classList.add('is-visible');
        $$('input:not([type="hidden"]):not([type="radio"]), textarea', form).forEach((i) => { i.value = ''; });
      });
      form.addEventListener('input', (e) => {
        const field = e.target.closest('.field');
        if (field && field.classList.contains('has-error')) field.classList.remove('has-error');
      });
    });
    bindNotifyForms();
    // nuorodos, kurios užpildo žinutę (pvz., klausimas apie elektromobilio įkrovimą)
    doc.addEventListener('click', (e) => {
      const a = e.target.closest('[data-prefill]');
      if (!a) return;
      const target = $(a.getAttribute('href'));
      const ta = target && $('textarea', target);
      if (ta) setTimeout(() => { ta.value = a.dataset.prefill; ta.focus({ preventScroll: true }); }, reduceMotion ? 0 : 500);
    });
    doc.addEventListener('click', (e) => {
      const b = e.target.closest('[data-copy-link]');
      if (!b) return;
      const done = () => snack('Nuoroda nukopijuota');
      if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done, done); else done();
    });
  };

  /* ---------- Nuotraukų peržiūra ---------- */
  const lightboxSets = {};
  const initLightbox = () => {
    let box = null, set = [], index = 0, lastFocus = null;
    const show = () => {
      $('img', box).src = set[index];
      $('img', box).alt = `Nuotrauka ${index + 1} iš ${set.length}`;
      $('.lightbox__count', box).textContent = `${index + 1} / ${set.length}`;
      const multi = set.length > 1;
      $('.lightbox__prev', box).hidden = !multi;
      $('.lightbox__next', box).hidden = !multi;
    };
    const close = () => { box.classList.remove('is-open'); doc.body.style.overflow = ''; lastFocus && lastFocus.focus(); };
    const build = () => {
      box = doc.createElement('div');
      box.className = 'lightbox';
      box.setAttribute('role', 'dialog');
      box.setAttribute('aria-modal', 'true');
      box.setAttribute('aria-label', 'Nuotraukų peržiūra');
      box.innerHTML = `<img alt=""><button class="lightbox__close" type="button" aria-label="Uždaryti"><i class="ph ph-x"></i></button>
        <button class="lightbox__prev" type="button" aria-label="Ankstesnė nuotrauka"><i class="ph ph-caret-left"></i></button>
        <button class="lightbox__next" type="button" aria-label="Kita nuotrauka"><i class="ph ph-caret-right"></i></button>
        <span class="lightbox__count"></span>`;
      doc.body.append(box);
      $('.lightbox__close', box).addEventListener('click', close);
      $('.lightbox__prev', box).addEventListener('click', () => { index = (index - 1 + set.length) % set.length; show(); });
      $('.lightbox__next', box).addEventListener('click', () => { index = (index + 1) % set.length; show(); });
      box.addEventListener('click', (e) => { if (e.target === box) close(); });
      doc.addEventListener('keydown', (e) => {
        if (!box.classList.contains('is-open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') $('.lightbox__prev', box).click();
        if (e.key === 'ArrowRight') $('.lightbox__next', box).click();
      });
    };
    doc.addEventListener('click', (e) => {
      const item = e.target.closest('[data-lightbox]');
      if (!item) return;
      if (!box) build();
      const group = item.dataset.lightbox;
      set = lightboxSets[group] || $$(`[data-lightbox="${group}"]`).map((b) => b.dataset.src);
      index = parseInt(item.dataset.index || '0', 10);
      lastFocus = item;
      show();
      box.classList.add('is-open');
      doc.body.style.overflow = 'hidden';
      $('.lightbox__close', box).focus();
    });
  };

  /* ---------- Pranešimų juostelė ---------- */
  let snackEl = null, snackTimer = 0;
  const snack = (text) => {
    if (!snackEl) {
      snackEl = doc.createElement('div');
      snackEl.className = 'snackbar';
      snackEl.setAttribute('role', 'status');
      snackEl.setAttribute('aria-live', 'polite');
      doc.body.append(snackEl);
    }
    snackEl.textContent = text;
    snackEl.classList.add('is-visible');
    clearTimeout(snackTimer);
    snackTimer = setTimeout(() => snackEl.classList.remove('is-visible'), 3200);
  };

  /* ---------- „Patalpų valdymas“ (tik maketui) ---------- */
  const initDemoPanel = () => {
    const panel = doc.createElement('div');
    panel.className = 'demo-panel';
    panel.innerHTML = `<div class="demo-panel__scrim" data-demo-close></div>
      <div class="demo-panel__sheet" role="dialog" aria-modal="true" aria-labelledby="demo-title">
        <div class="demo-panel__head">
          <h2 id="demo-title">Patalpų valdymas</h2>
          <p>Taip veiks WordPress'e: atsilaisvinusią patalpą paskelbiate, išnuomotą perkeliate į juodraštį. Išjunkite patalpą ir pažiūrėkite, kaip ji dingsta iš sąrašų, žemėlapio ir skaičių.</p>
          <button class="demo-panel__close" type="button" data-demo-close aria-label="Uždaryti"><i class="ph ph-x"></i></button>
        </div>
        <div class="demo-panel__body">
          <div class="demo-panel__group"><h3>Laisvos patalpos</h3><div data-demo-rows></div></div>
          <div class="demo-panel__group"><h3>Maketo nustatymai</h3>
            <div class="demo-row"><div class="demo-row__text"><strong>Rodyti pavyzdines patalpas</strong><span>Išjungus lieka tik tikri duomenys iš elile.lt</span></div>
              <label class="switch"><input type="checkbox" data-demo-examples aria-label="Rodyti pavyzdines patalpas"><span></span></label></div>
            <div class="demo-row"><div class="demo-row__text"><strong>Žymėti pavyzdžius</strong><span>Žyma „Pavyzdys“ ant kortelių</span></div>
              <label class="switch"><input type="checkbox" data-demo-tags aria-label="Žymėti pavyzdžius"><span></span></label></div>
          </div>
        </div>
        <div class="demo-panel__foot">
          <button class="btn btn--ghost btn--sm" type="button" data-demo-reset>Atstatyti</button>
          <button class="btn btn--ink btn--sm" type="button" data-demo-close>Uždaryti</button>
        </div>
      </div>`;
    doc.body.append(panel);
    let lastFocus = null;
    const rows = $('[data-demo-rows]', panel);
    const paint = () => {
      rows.innerHTML = D.units.map((u) => {
        const o = objById(u.object);
        const disabled = u.example && !state.examples;
        return `<div class="demo-row"${disabled ? ' style="opacity:.45"' : ''}>
          <div class="demo-row__text"><strong>${esc(u.title)}, ${fmtArea(u.area)}</strong><span>${esc(o.name)}, ${u.floor} aukštas</span></div>
          <span class="demo-row__badge${u.example ? ' demo-row__badge--ex' : ''}">${u.example ? 'Pavyzdys' : 'Tikra'}</span>
          <label class="switch"><input type="checkbox" data-demo-unit="${u.id}" ${state.rented.has(u.id) ? '' : 'checked'} ${disabled ? 'disabled' : ''} aria-label="${esc(u.title)} ${esc(o.name)}: laisva"><span></span></label>
        </div>`;
      }).join('');
      $('[data-demo-examples]', panel).checked = state.examples;
      $('[data-demo-tags]', panel).checked = state.exampleTags;
    };
    const open = () => { lastFocus = doc.activeElement; paint(); panel.classList.add('is-open'); $('.demo-panel__close', panel).focus(); };
    const close = () => { panel.classList.remove('is-open'); lastFocus && lastFocus.focus(); };
    doc.addEventListener('click', (e) => {
      if (e.target.closest('[data-demo-open]')) { e.preventDefault(); open(); }
      if (e.target.closest('[data-demo-close]')) close();
    });
    doc.addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel.classList.contains('is-open')) close(); });
    panel.addEventListener('change', (e) => {
      const t = e.target;
      if (t.dataset.demoUnit) {
        const u = unitById(t.dataset.demoUnit);
        if (t.checked) state.rented.delete(u.id); else state.rented.add(u.id);
        snack(t.checked ? `Paskelbta: ${u.title.toLowerCase()}, ${fmtArea(u.area)}` : `Išnuomota: ${u.title.toLowerCase()}, ${fmtArea(u.area)}. Dingo iš sąrašų ir žemėlapio.`);
      }
      if ('demoExamples' in t.dataset) { state.examples = t.checked; snack(t.checked ? 'Rodomos ir pavyzdinės patalpos' : 'Rodomi tik tikri duomenys iš elile.lt'); }
      if ('demoTags' in t.dataset) state.exampleTags = t.checked;
      saveState();
      paint();
      update(true);
    });
    $('[data-demo-reset]', panel).addEventListener('click', () => {
      state.rented.clear(); state.examples = true; state.exampleTags = true;
      saveState(); paint(); update(true);
      snack('Maketo būsena atstatyta');
    });
  };

  /* ---------- Atnaujinimas pasikeitus duomenims ---------- */
  let watchPx = null;
  const update = (animate) => {
    renderCounts();
    renderHeroCard();
    renderUnitGrids(animate);
    renderListing(animate);
    refreshMaps();
    bindNotifyForms();
    observeReveals();
    if (watchPx) watchPx();
    if (animate) $$('.unit-grid [data-reveal], .unit-grid[data-reveal]').forEach((el) => el.classList.add('is-in'));
  };

  /* ---------- Paleidimas ---------- */
  const boot = () => {
    renderObjectPage();
    renderUnitPage();
    initListingControls();
    renderCounts();
    renderHeroCard();
    renderUnitGrids(false);
    renderListing(false);
    initHeader();
    initHeroVideo();
    initToggles();
    initTabs();
    initForms();
    initLightbox();
    initDemoPanel();
    initCounters();
    watchPx = initParallax();
    initMaps();
    const fontsReady = doc.fonts && doc.fonts.ready ? doc.fonts.ready : Promise.resolve();
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 800))]).then(() => {
      splitAll();
      observeReveals();
    });
  };

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot); else boot();
})();
