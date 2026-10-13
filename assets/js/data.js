/* UAB „Elile“: maketo duomenys.
   WordPress'e tai bus įrašai: kiekviena patalpa yra atskiras įrašas (Salient Portfolio projektas),
   objektas (pastatas) yra jo kategorija. Išnuomota patalpa perkeliama į juodraštį ir dingsta visur.
   Tikri duomenys paimti iš elile.lt. Įrašai su example: true yra pavyzdžiai, kad matytųsi,
   kaip sąrašas atrodys, kai laisvų patalpų bus daugiau. */
window.ELILE = {
  company: {
    name: 'UAB „Elile“',
    code: '302312560',
    vat: 'LT100007225110',
    address: 'Purvynės g. 15-15, LT-93128 Neringa',
    email: 'info@elile.lt', // patikslinti su klientu: dabartinėje svetainėje el. pašto nėra
    rentPhone: '+370 699 92062',
    rentPhoneHref: 'tel:+37069992062'
  },

  people: [
    { name: 'Gediminas Navickas', role: 'Nuomos vadybininkas', phone: '+370 699 92062', href: 'tel:+37069992062', initials: 'GN', main: true },
    { name: 'Saulius Tomas Ivanauskas', role: 'Direktorius', phone: '+370 652 24474', href: 'tel:+37065224474', initials: 'SI' }
  ],

  objects: [
    {
      id: 'donelaicio-33',
      name: 'K. Donelaičio g. 33',
      city: 'Kaunas',
      district: 'Naujamiestis, Kauno centras',
      zip: 'LT-44240',
      kind: 'Biurų pastatas centre',
      lat: 54.8985675,
      lng: 23.9184641,
      photo: 'assets/img/objektai/donelaicio-33.jpg',
      lead: 'Biurų pastatas pačiame Kauno centre, per kelias minutes pėsčiomis nuo Laisvės alėjos ir Vienybės aikštės.',
      about: [
        'Pastatas stovi K. Donelaičio gatvėje, Naujamiestyje. Šalia yra Gedimino g. stotelė, kurioje stoja autobusai ir troleibusai, todėl darbuotojams ir klientams lengva atvykti viešuoju transportu.',
        'Prie pastato įrengta lengvųjų automobilių aikštelė. Teritoriją ir bendras patalpas prižiūri pastato valdytojas.'
      ],
      highlights: [
        { icon: 'ph-bus', value: '90 m', label: 'iki Gedimino g. stotelės' },
        { icon: 'ph-signpost', value: '290 m', label: 'iki Laisvės alėjos' },
        { icon: 'ph-car', value: 'Yra', label: 'automobilių aikštelė' }
      ],
      services: [
        { icon: 'ph-lightning', label: 'Elektra' },
        { icon: 'ph-thermometer-simple', label: 'Šildymas' },
        { icon: 'ph-drop', label: 'Vanduo ir nuotekos' },
        { icon: 'ph-recycle', label: 'Šiukšlių išvežimas' },
        { icon: 'ph-broom', label: 'Teritorijos ir bendrų patalpų priežiūra' },
        { icon: 'ph-wifi-high', label: 'Ryšių įvadai' },
        { icon: 'ph-car', label: 'Lengvųjų automobilių aikštelė' },
        { icon: 'ph-charging-station', label: 'Elektromobilių įkrovimas' },
        { icon: 'ph-package', label: 'Paštomatas prie pastato' }
      ],
      poi: [
        { name: 'Gedimino g. stotelė', note: 'autobusai ir troleibusai', icon: 'ph-bus', lat: 54.898723, lng: 23.9198855 },
        { name: 'Studentų skvero stotelė', note: 'autobusai', icon: 'ph-bus', lat: 54.8989638, lng: 23.9142003 },
        { name: 'Laisvės alėja', note: 'pėsčiųjų alėja', icon: 'ph-signpost', lat: 54.8976932, lng: 23.9142237 },
        { name: 'Vienybės aikštė', note: 'VDU, KTU', icon: 'ph-map-pin', lat: 54.8997351, lng: 23.9136428 },
        { name: 'PLC „Akropolis“', note: 'prekybos centras', icon: 'ph-storefront', lat: 54.8914648, lng: 23.9194883 },
        { name: 'Kauno autobusų stotis', note: 'tarpmiestiniai autobusai', icon: 'ph-bus', lat: 54.8895825, lng: 23.9280097 },
        { name: 'Kauno geležinkelio stotis', note: 'traukiniai', icon: 'ph-train', lat: 54.8864985, lng: 23.9315466 }
      ],
      ev: true,
      // stotelės: skaičius ir galia — iš UAB „Elile“ (2026-10)
      evPhoto: 'assets/img/ev-stotele-donelaicio-33.jpg',
      evCount: 4, evPlanned: 4, evPower: '11 kW', evNote: 'Jau įrengtos ir viešos prieigos stotelės, o dar 2 įrengiamos ir 2 planuojamos.',
      // bendradarbiavimas su LP EXPRESS (UAB „Elile“, 2026-10)
      perk: {
        title: 'LP EXPRESS paštomatas prie pastato',
        text: 'K. Donelaičio g. 33 bendradarbiaujame su LP EXPRESS: paštomatas stovi čia pat, todėl jūsų siuntinys atkeliaus beveik iki durų. Pigiau, nereikės laukti kurjerio, o siuntinį atsiimsite bet kada.',
        photo: 'assets/img/lp-express-pastomatas.jpg',
        facts: [
          { icon: 'ph-map-pin', value: 'Prie durų', label: 'paštomatas šalia pastato' },
          { icon: 'ph-receipt', value: 'Pigiau', label: 'nei pristatymas kurjeriu' },
          { icon: 'ph-clock', value: 'Bet kada', label: 'atsiimsite siuntinį' }
        ]
      }
    },
    {
      id: 'jovaru-2',
      name: 'Jovarų g. 2',
      city: 'Kaunas',
      district: 'Vilijampolė',
      zip: 'LT-47190',
      kind: 'Biurai, prekyba ir sandėliai',
      lat: 54.9103563,
      lng: 23.8417997,
      photo: 'assets/img/objektai/jovaru-2.jpg',
      lead: 'Biuro, prekybinės ir sandėliavimo patalpos Vilijampolėje, prie Raudondvario plento ir Vakarinio aplinkkelio (A5). Teritorijoje statomi du nauji prekybos paskirties pastatai: 7 blokai, juos jau galima rezervuoti.',
      about: [
        'Pastatas patogus įmonėms, kurioms svarbi logistika: iki Raudondvario plento apie 0,3 km, iki Vakarinio aplinkkelio (A5) apie 0,5 km.',
        'Aikštelėje telpa lengvieji automobiliai ir sunkusis transportas. Be biurų, nuomojamos ir sandėliavimo patalpos.',
        'Teritorijoje statomi du nauji prekybos paskirties pastatai: 7 blokai po 360 ir 504 m², kartu apie 2 800 m². Kiekviename bloke po 72 m² pirmame ir antrame (antresolės) aukštuose pritaikyta biurui ar pardavimams, likusi dalis — prekybos salė ar sandėlis su pramoninėmis šlifuoto betono grindimis ir vartais sunkiajam transportui. Blokus jau galima rezervuoti.'
      ],
      highlights: [
        { icon: 'ph-road-horizon', value: '0,5 km', label: 'iki Vakarinio aplinkkelio (A5)' },
        { icon: 'ph-truck', value: 'Yra', label: 'aikštelė sunkiajam transportui' },
        { icon: 'ph-buildings', value: '7', label: 'nauji prekybos patalpų blokai (statoma)' }
      ],
      services: [
        { icon: 'ph-lightning', label: 'Elektra' },
        { icon: 'ph-thermometer-simple', label: 'Šildymas' },
        { icon: 'ph-drop', label: 'Vanduo ir nuotekos' },
        { icon: 'ph-recycle', label: 'Šiukšlių išvežimas' },
        { icon: 'ph-broom', label: 'Teritorijos ir bendrų patalpų priežiūra' },
        { icon: 'ph-wifi-high', label: 'Ryšių įvadai' },
        { icon: 'ph-car', label: 'Lengvųjų automobilių aikštelė' },
        { icon: 'ph-truck', label: 'Sunkiojo transporto aikštelė' },
        { icon: 'ph-package', label: 'Sandėliavimo patalpos' },
        { icon: 'ph-charging-station', label: 'Elektromobilių įkrovimas' }
      ],
      poi: [
        { name: 'Kulautuvos g. stotelė', note: 'autobusai', icon: 'ph-bus', lat: 54.9096223, lng: 23.8420398 },
        { name: 'Atominio bunkerio muziejaus stotelė', note: 'autobusai', icon: 'ph-bus', lat: 54.9118618, lng: 23.8443072 },
        { name: 'Raudondvario plentas', note: 'kelias 141', icon: 'ph-road-horizon', lat: 54.9125054, lng: 23.8442153 },
        { name: 'Vakarinis aplinkkelis (A5)', note: 'Via Baltica kryptis', icon: 'ph-road-horizon', lat: 54.9110149, lng: 23.8342765 },
        { name: 'Kauno senamiestis', note: 'Rotušės aikštė', icon: 'ph-map-pin', lat: 54.8968586, lng: 23.8858991 }
      ],
      ev: true,
      evCount: 8, evPlanned: 0, evPower: '11 kW', evNote: 'Baigus statybas stotelės bus perkeltos prie naujų prekybos pastatų.'
    }
  ],

  units: [
    {
      id: 'donelaicio-33-v-4082',
      object: 'donelaicio-33',
      type: 'Biuras',
      title: 'Biuro patalpos',
      area: 40.82,
      floor: 'V',
      price: 7.5,
      from: 'Laisva dabar',
      updated: '2026-09-15',
      photos: [
        'assets/img/patalpos/donelaicio-33-v-4082-1.jpg',
        'assets/img/patalpos/donelaicio-33-v-4082-2.jpg',
        'assets/img/patalpos/donelaicio-33-v-4082-3.jpg',
        'assets/img/patalpos/donelaicio-33-v-4082-4.jpg'
      ],
      summary: 'Tvarkingos, šviesios patalpos penktame aukšte, su langais į miestą.',
      description: [
        'Nuomojamos biuro patalpos Kauno centre, K. Donelaičio g. 33. Patalpos penktame aukšte, tvarkingos, plotas 40,82 m².',
        'Visos komunikacijos: elektra, šildymas, vanduo ir nuotekos, šiukšlių išvežimas, ryšių įvadai. WC šalia patalpų, bendrame koridoriuje.',
        'Patogus susisiekimas viešuoju transportu, strategiškai patogi ir lengvai randama vieta.'
      ],
      specs: [
        { icon: 'ph-frame-corners', label: 'Plotas', value: '40,82 m²' },
        { icon: 'ph-stairs', label: 'Aukštas', value: 'V' },
        { icon: 'ph-briefcase', label: 'Paskirtis', value: 'Biuras' },
        { icon: 'ph-toilet', label: 'WC', value: 'Bendrame koridoriuje' },
        { icon: 'ph-car', label: 'Parkavimas', value: 'Aikštelė prie pastato' },
        { icon: 'ph-calendar-check', label: 'Įsikelti', value: 'Nuo dabar' }
      ]
    },
    {
      id: 'donelaicio-33-iii-2260',
      object: 'donelaicio-33',
      example: true,
      type: 'Biuras',
      title: 'Biuro patalpos',
      area: 22.6,
      floor: 'III',
      price: 8,
      from: 'Nuo 2026-11-01',
      updated: '2026-09-10',
      photos: ['https://images.pexels.com/photos/7534173/pexels-photo-7534173.jpeg?auto=compress&cs=tinysrgb&w=1400'],
      summary: 'Nedidelis kabinetas 2-3 darbo vietoms trečiame aukšte.',
      description: [
        'Pavyzdinė patalpa: parodo, kaip sąraše atrodys kelios laisvos patalpos viename pastate.',
        'Nedidelis kabinetas trečiame aukšte, tinkamas 2-3 darbo vietoms. Visos komunikacijos, WC bendrame koridoriuje.'
      ],
      specs: [
        { icon: 'ph-frame-corners', label: 'Plotas', value: '22,60 m²' },
        { icon: 'ph-stairs', label: 'Aukštas', value: 'III' },
        { icon: 'ph-briefcase', label: 'Paskirtis', value: 'Biuras' },
        { icon: 'ph-calendar-check', label: 'Įsikelti', value: 'Nuo 2026-11-01' }
      ]
    },
    {
      id: 'donelaicio-33-i-6450',
      object: 'donelaicio-33',
      example: true,
      type: 'Paslaugos',
      title: 'Paslaugų patalpos',
      area: 64.5,
      floor: 'I',
      price: 9.5,
      from: 'Laisva dabar',
      updated: '2026-09-02',
      photos: ['https://images.pexels.com/photos/7750129/pexels-photo-7750129.jpeg?auto=compress&cs=tinysrgb&w=1400'],
      summary: 'Pirmo aukšto patalpos su atskiru įėjimu klientams.',
      description: [
        'Pavyzdinė patalpa: parodo, kaip atrodys pirmo aukšto paslaugų patalpos kortelė.',
        'Patalpos pirmame aukšte, tinka klientų aptarnavimui, konsultacijoms ar mažam biurui.'
      ],
      specs: [
        { icon: 'ph-frame-corners', label: 'Plotas', value: '64,50 m²' },
        { icon: 'ph-stairs', label: 'Aukštas', value: 'I' },
        { icon: 'ph-briefcase', label: 'Paskirtis', value: 'Paslaugos' },
        { icon: 'ph-calendar-check', label: 'Įsikelti', value: 'Nuo dabar' }
      ]
    },
    {
      id: 'jovaru-2-i-320',
      object: 'jovaru-2',
      example: true,
      type: 'Sandėlis',
      title: 'Sandėliavimo patalpos',
      area: 320,
      floor: 'I',
      price: 4.2,
      from: 'Laisva dabar',
      updated: '2026-09-12',
      photos: [
        'https://images.pexels.com/photos/36122954/pexels-photo-36122954.jpeg?auto=compress&cs=tinysrgb&w=1400',
        'https://images.pexels.com/photos/37389217/pexels-photo-37389217.jpeg?auto=compress&cs=tinysrgb&w=1400'
      ],
      summary: 'Sandėlis pirmame aukšte su privažiavimu sunkiajam transportui.',
      description: [
        'Pavyzdinė patalpa: parodo, kaip atrodys sandėlio kortelė Jovarų g. 2 pastate.',
        'Sandėliavimo patalpos pirmame aukšte. Aikštelėje telpa sunkusis transportas, iki Vakarinio aplinkkelio (A5) apie 0,5 km.'
      ],
      specs: [
        { icon: 'ph-frame-corners', label: 'Plotas', value: '320 m²' },
        { icon: 'ph-stairs', label: 'Aukštas', value: 'I' },
        { icon: 'ph-package', label: 'Paskirtis', value: 'Sandėlis' },
        { icon: 'ph-truck', label: 'Privažiavimas', value: 'Sunkiajam transportui' },
        { icon: 'ph-calendar-check', label: 'Įsikelti', value: 'Nuo dabar' }
      ]
    },
    {
      id: 'jovaru-2-ii-8640',
      object: 'jovaru-2',
      example: true,
      type: 'Biuras',
      title: 'Biuro patalpos',
      area: 86.4,
      floor: 'II',
      price: 6.5,
      from: 'Nuo 2026-10-15',
      updated: '2026-09-08',
      photos: ['https://images.pexels.com/photos/6794970/pexels-photo-6794970.jpeg?auto=compress&cs=tinysrgb&w=1400'],
      summary: 'Atviras biuras komandai, šalia sandėlio.',
      description: [
        'Pavyzdinė patalpa: parodo, kaip atrodys biuro kortelė Jovarų g. 2 pastate.',
        'Atviros erdvės biuras antrame aukšte, patogus įmonei, kuri tame pačiame pastate nuomojasi ir sandėlį.'
      ],
      specs: [
        { icon: 'ph-frame-corners', label: 'Plotas', value: '86,40 m²' },
        { icon: 'ph-stairs', label: 'Aukštas', value: 'II' },
        { icon: 'ph-briefcase', label: 'Paskirtis', value: 'Biuras' },
        { icon: 'ph-calendar-check', label: 'Įsikelti', value: 'Nuo 2026-10-15' }
      ]
    },
    {
      id: 'jovaru-2-teritorija',
      object: 'jovaru-2',
      type: 'Teritorija',
      title: 'Teritorija arba parkavimo vietos',
      area: 2500,
      floor: '',
      price: 0.75,
      noMonthly: true,
      from: 'Laisva dabar',
      updated: '2026-10-13',
      photos: ['assets/img/teritorija/5.jpg', 'assets/img/teritorija/2.jpg', 'assets/img/teritorija/1.jpg', 'assets/img/teritorija/6.jpg', 'assets/img/teritorija/7.jpg', 'assets/img/teritorija/3.jpg', 'assets/img/teritorija/4.jpg', 'assets/img/teritorija/8.jpg'],
      video: 'assets/video/teritorija.mp4',
      videoTitle: 'Teritorija iš oro',
      summary: 'Teritorija automobilių parkavimui, automobilių prekybos aikštelei ar sandėliavimui. Nuomojama visa arba dalimis.',
      description: [
        'Jovarų g. 2 nuomojama apie 2 500 m² teritorija: automobilių parkavimui, automobilių pardavimo aikštelei ar sandėliavimui. Teritorija asfaltuota, pažymėtos numeruotos parkavimo vietos.',
        'Kaina priklauso nuo apimties ir derinama individualiai. Standartinė parkavimo vietos kaina — 25 € per mėnesį + PVM, teritorijos nuomos kaina — 0,75 €/m² + PVM.',
        'Pageidaujamas nuomos terminas — ne trumpesnis nei 1 metai.'
      ],
      specs: [
        { icon: 'ph-frame-corners', label: 'Plotas', value: '~2 500 m²' },
        { icon: 'ph-check-circle', label: 'Tinka', value: 'Parkavimui, automobilių prekybai, sandėliavimui' },
        { icon: 'ph-car', label: 'Parkavimo vieta', value: '25 €/mėn. + PVM' },
        { icon: 'ph-map-trifold', label: 'Teritorija', value: '0,75 €/m² + PVM' },
        { icon: 'ph-receipt', label: 'Kaina', value: 'Derinama pagal apimtį' },
        { icon: 'ph-calendar-check', label: 'Nuomos terminas', value: 'Nuo 1 metų' }
      ],
      services: [
        { icon: 'ph-car', label: 'Lengvųjų automobilių aikštelė' },
        { icon: 'ph-truck', label: 'Sunkiojo transporto aikštelė' }
      ]
    },
    {
      id: 'prekyba-blokas-1',
      object: 'jovaru-2',
      build: true,
      type: 'Prekyba',
      title: 'Prekybos patalpos, blokas 1',
      area: 360,
      floor: 'I + antresolė',
      price: 0,
      from: 'Statoma · rezervuokite',
      updated: '2026-10-01',
      photos: ['assets/img/stock/blokas-1.png', 'assets/img/stock/vizualizacija-1.jpg', 'assets/img/stock/vizualizacija-2.jpg', 'assets/img/stock/statybos-1.jpg', 'assets/img/stock/statybos-2.jpg'],
      video: 'assets/video/statybos.mp4',
      videoTitle: 'Statybų eiga, 2026 m. spalis',
      summary: 'Blokas 1 iš 7: 288 m² pirmame aukšte ir 72 m² antresolė. Priekyje biuras ar parduotuvė, gale prekybos salė ar sandėlis.',
      description: [
        'Naujame prekybos paskirties pastate Jovarų g. 2 statomas blokas Nr. 1: 288 m² pirmame aukšte ir 72 m² antresolė antrame aukšte, iš viso 360 m².',
        'Priekinėje dalyje pirmame ir antrame aukštuose po 72 m² pritaikyta biurui ar pardavimams, čia galima įrengti darbo vietas. Pagal pastato baigtumo aprašą bus įrengta laiptinė į antresolę, elektros instaliacija, apšvietimas ir interneto įvadai.',
        'Likusi patalpos dalis — prekybos salė ar sandėlis: pramoninės šlifuoto betono grindys, pramoniniai vartai sunkiajam transportui, šildymas, vėdinimas ir kondicionavimas.',
        'Patalpą jau galima rezervuoti: susisiekite, aptarsime sąlygas ir įsikėlimo laiką.'
      ],
      specs: [
        { icon: 'ph-frame-corners', label: 'Plotas', value: '360 m²' },
        { icon: 'ph-buildings', label: 'Blokas', value: '1 iš 7 (1 pastatas)' },
        { icon: 'ph-stack', label: 'I aukštas + antresolė', value: '288 + 72 m²' },
        { icon: 'ph-briefcase', label: 'Biuras / pardavimai', value: '72 m² I a. + 72 m² II a.' },
        { icon: 'ph-square', label: 'Grindys', value: 'Šlifuotas betonas' },
        { icon: 'ph-truck', label: 'Vartai', value: 'Pramoniniai, sunkiajam transportui' }
      ],
      services: [
        { icon: 'ph-lightning', label: 'Elektra' },
        { icon: 'ph-thermometer-simple', label: 'Šildymas' },
        { icon: 'ph-wind', label: 'Vėdinimas' },
        { icon: 'ph-snowflake', label: 'Kondicionavimas' },
        { icon: 'ph-siren', label: 'Apsaugos signalizacija' },
        { icon: 'ph-fire-extinguisher', label: 'Gaisrinė signalizacija' },
        { icon: 'ph-wifi-high', label: 'Internetas' }
      ]
    },
    {
      id: 'prekyba-blokas-2',
      object: 'jovaru-2',
      build: true,
      type: 'Prekyba',
      title: 'Prekybos patalpos, blokas 2',
      area: 360,
      floor: 'I + antresolė',
      price: 0,
      from: 'Statoma · rezervuokite',
      updated: '2026-10-02',
      photos: ['assets/img/stock/blokas-2.png', 'assets/img/stock/vizualizacija-1.jpg', 'assets/img/stock/vizualizacija-2.jpg', 'assets/img/stock/statybos-1.jpg', 'assets/img/stock/statybos-2.jpg'],
      video: 'assets/video/statybos.mp4',
      videoTitle: 'Statybų eiga, 2026 m. spalis',
      summary: 'Blokas 2 iš 7: 288 m² pirmame aukšte ir 72 m² antresolė. Priekyje biuras ar parduotuvė, gale prekybos salė ar sandėlis.',
      description: [
        'Naujame prekybos paskirties pastate Jovarų g. 2 statomas blokas Nr. 2: 288 m² pirmame aukšte ir 72 m² antresolė antrame aukšte, iš viso 360 m².',
        'Priekinėje dalyje pirmame ir antrame aukštuose po 72 m² pritaikyta biurui ar pardavimams, čia galima įrengti darbo vietas. Pagal pastato baigtumo aprašą bus įrengta laiptinė į antresolę, elektros instaliacija, apšvietimas ir interneto įvadai.',
        'Likusi patalpos dalis — prekybos salė ar sandėlis: pramoninės šlifuoto betono grindys, pramoniniai vartai sunkiajam transportui, šildymas, vėdinimas ir kondicionavimas.',
        'Patalpą jau galima rezervuoti: susisiekite, aptarsime sąlygas ir įsikėlimo laiką.'
      ],
      specs: [
        { icon: 'ph-frame-corners', label: 'Plotas', value: '360 m²' },
        { icon: 'ph-buildings', label: 'Blokas', value: '2 iš 7 (1 pastatas)' },
        { icon: 'ph-stack', label: 'I aukštas + antresolė', value: '288 + 72 m²' },
        { icon: 'ph-briefcase', label: 'Biuras / pardavimai', value: '72 m² I a. + 72 m² II a.' },
        { icon: 'ph-square', label: 'Grindys', value: 'Šlifuotas betonas' },
        { icon: 'ph-truck', label: 'Vartai', value: 'Pramoniniai, sunkiajam transportui' }
      ],
      services: [
        { icon: 'ph-lightning', label: 'Elektra' },
        { icon: 'ph-thermometer-simple', label: 'Šildymas' },
        { icon: 'ph-wind', label: 'Vėdinimas' },
        { icon: 'ph-snowflake', label: 'Kondicionavimas' },
        { icon: 'ph-siren', label: 'Apsaugos signalizacija' },
        { icon: 'ph-fire-extinguisher', label: 'Gaisrinė signalizacija' },
        { icon: 'ph-wifi-high', label: 'Internetas' }
      ]
    },
    {
      id: 'prekyba-blokas-3',
      object: 'jovaru-2',
      build: true,
      type: 'Prekyba',
      title: 'Prekybos patalpos, blokas 3',
      area: 360,
      floor: 'I + antresolė',
      price: 0,
      from: 'Statoma · rezervuokite',
      updated: '2026-10-03',
      photos: ['assets/img/stock/blokas-3.png', 'assets/img/stock/vizualizacija-1.jpg', 'assets/img/stock/vizualizacija-2.jpg', 'assets/img/stock/statybos-1.jpg', 'assets/img/stock/statybos-2.jpg'],
      video: 'assets/video/statybos.mp4',
      videoTitle: 'Statybų eiga, 2026 m. spalis',
      summary: 'Blokas 3 iš 7: 288 m² pirmame aukšte ir 72 m² antresolė. Priekyje biuras ar parduotuvė, gale prekybos salė ar sandėlis.',
      description: [
        'Naujame prekybos paskirties pastate Jovarų g. 2 statomas blokas Nr. 3: 288 m² pirmame aukšte ir 72 m² antresolė antrame aukšte, iš viso 360 m².',
        'Priekinėje dalyje pirmame ir antrame aukštuose po 72 m² pritaikyta biurui ar pardavimams, čia galima įrengti darbo vietas. Pagal pastato baigtumo aprašą bus įrengta laiptinė į antresolę, elektros instaliacija, apšvietimas ir interneto įvadai.',
        'Likusi patalpos dalis — prekybos salė ar sandėlis: pramoninės šlifuoto betono grindys, pramoniniai vartai sunkiajam transportui, šildymas, vėdinimas ir kondicionavimas.',
        'Patalpą jau galima rezervuoti: susisiekite, aptarsime sąlygas ir įsikėlimo laiką.'
      ],
      specs: [
        { icon: 'ph-frame-corners', label: 'Plotas', value: '360 m²' },
        { icon: 'ph-buildings', label: 'Blokas', value: '3 iš 7 (1 pastatas)' },
        { icon: 'ph-stack', label: 'I aukštas + antresolė', value: '288 + 72 m²' },
        { icon: 'ph-briefcase', label: 'Biuras / pardavimai', value: '72 m² I a. + 72 m² II a.' },
        { icon: 'ph-square', label: 'Grindys', value: 'Šlifuotas betonas' },
        { icon: 'ph-truck', label: 'Vartai', value: 'Pramoniniai, sunkiajam transportui' }
      ],
      services: [
        { icon: 'ph-lightning', label: 'Elektra' },
        { icon: 'ph-thermometer-simple', label: 'Šildymas' },
        { icon: 'ph-wind', label: 'Vėdinimas' },
        { icon: 'ph-snowflake', label: 'Kondicionavimas' },
        { icon: 'ph-siren', label: 'Apsaugos signalizacija' },
        { icon: 'ph-fire-extinguisher', label: 'Gaisrinė signalizacija' },
        { icon: 'ph-wifi-high', label: 'Internetas' }
      ]
    },
    {
      id: 'prekyba-blokas-4',
      object: 'jovaru-2',
      build: true,
      type: 'Prekyba',
      title: 'Prekybos patalpos, blokas 4',
      area: 360,
      floor: 'I + antresolė',
      price: 0,
      from: 'Statoma · rezervuokite',
      updated: '2026-10-04',
      photos: ['assets/img/stock/blokas-4.png', 'assets/img/stock/vizualizacija-1.jpg', 'assets/img/stock/vizualizacija-2.jpg', 'assets/img/stock/statybos-1.jpg', 'assets/img/stock/statybos-2.jpg'],
      video: 'assets/video/statybos.mp4',
      videoTitle: 'Statybų eiga, 2026 m. spalis',
      summary: 'Blokas 4 iš 7: 288 m² pirmame aukšte ir 72 m² antresolė. Priekyje biuras ar parduotuvė, gale prekybos salė ar sandėlis.',
      description: [
        'Naujame prekybos paskirties pastate Jovarų g. 2 statomas blokas Nr. 4: 288 m² pirmame aukšte ir 72 m² antresolė antrame aukšte, iš viso 360 m².',
        'Priekinėje dalyje pirmame ir antrame aukštuose po 72 m² pritaikyta biurui ar pardavimams, čia galima įrengti darbo vietas. Pagal pastato baigtumo aprašą bus įrengta laiptinė į antresolę, elektros instaliacija, apšvietimas ir interneto įvadai.',
        'Likusi patalpos dalis — prekybos salė ar sandėlis: pramoninės šlifuoto betono grindys, pramoniniai vartai sunkiajam transportui, šildymas, vėdinimas ir kondicionavimas.',
        'Patalpą jau galima rezervuoti: susisiekite, aptarsime sąlygas ir įsikėlimo laiką.'
      ],
      specs: [
        { icon: 'ph-frame-corners', label: 'Plotas', value: '360 m²' },
        { icon: 'ph-buildings', label: 'Blokas', value: '4 iš 7 (1 pastatas)' },
        { icon: 'ph-stack', label: 'I aukštas + antresolė', value: '288 + 72 m²' },
        { icon: 'ph-briefcase', label: 'Biuras / pardavimai', value: '72 m² I a. + 72 m² II a.' },
        { icon: 'ph-square', label: 'Grindys', value: 'Šlifuotas betonas' },
        { icon: 'ph-truck', label: 'Vartai', value: 'Pramoniniai, sunkiajam transportui' }
      ],
      services: [
        { icon: 'ph-lightning', label: 'Elektra' },
        { icon: 'ph-thermometer-simple', label: 'Šildymas' },
        { icon: 'ph-wind', label: 'Vėdinimas' },
        { icon: 'ph-snowflake', label: 'Kondicionavimas' },
        { icon: 'ph-siren', label: 'Apsaugos signalizacija' },
        { icon: 'ph-fire-extinguisher', label: 'Gaisrinė signalizacija' },
        { icon: 'ph-wifi-high', label: 'Internetas' }
      ]
    },
    {
      id: 'prekyba-blokas-5',
      object: 'jovaru-2',
      build: true,
      type: 'Prekyba',
      title: 'Prekybos patalpos, blokas 5',
      area: 360,
      floor: 'I + antresolė',
      price: 0,
      from: 'Statoma · rezervuokite',
      updated: '2026-10-05',
      photos: ['assets/img/stock/blokas-5.png', 'assets/img/stock/vizualizacija-1.jpg', 'assets/img/stock/vizualizacija-2.jpg', 'assets/img/stock/statybos-1.jpg', 'assets/img/stock/statybos-2.jpg'],
      video: 'assets/video/statybos.mp4',
      videoTitle: 'Statybų eiga, 2026 m. spalis',
      summary: 'Blokas 5 iš 7: 288 m² pirmame aukšte ir 72 m² antresolė. Priekyje biuras ar parduotuvė, gale prekybos salė ar sandėlis.',
      description: [
        'Naujame prekybos paskirties pastate Jovarų g. 2 statomas blokas Nr. 5: 288 m² pirmame aukšte ir 72 m² antresolė antrame aukšte, iš viso 360 m².',
        'Priekinėje dalyje pirmame ir antrame aukštuose po 72 m² pritaikyta biurui ar pardavimams, čia galima įrengti darbo vietas. Pagal pastato baigtumo aprašą bus įrengta laiptinė į antresolę, elektros instaliacija, apšvietimas ir interneto įvadai.',
        'Likusi patalpos dalis — prekybos salė ar sandėlis: pramoninės šlifuoto betono grindys, pramoniniai vartai sunkiajam transportui, šildymas, vėdinimas ir kondicionavimas.',
        'Patalpą jau galima rezervuoti: susisiekite, aptarsime sąlygas ir įsikėlimo laiką.'
      ],
      specs: [
        { icon: 'ph-frame-corners', label: 'Plotas', value: '360 m²' },
        { icon: 'ph-buildings', label: 'Blokas', value: '5 iš 7 (2 pastatas)' },
        { icon: 'ph-stack', label: 'I aukštas + antresolė', value: '288 + 72 m²' },
        { icon: 'ph-briefcase', label: 'Biuras / pardavimai', value: '72 m² I a. + 72 m² II a.' },
        { icon: 'ph-square', label: 'Grindys', value: 'Šlifuotas betonas' },
        { icon: 'ph-truck', label: 'Vartai', value: 'Pramoniniai, sunkiajam transportui' }
      ],
      services: [
        { icon: 'ph-lightning', label: 'Elektra' },
        { icon: 'ph-thermometer-simple', label: 'Šildymas' },
        { icon: 'ph-wind', label: 'Vėdinimas' },
        { icon: 'ph-snowflake', label: 'Kondicionavimas' },
        { icon: 'ph-siren', label: 'Apsaugos signalizacija' },
        { icon: 'ph-fire-extinguisher', label: 'Gaisrinė signalizacija' },
        { icon: 'ph-wifi-high', label: 'Internetas' }
      ]
    },
    {
      id: 'prekyba-blokas-6',
      object: 'jovaru-2',
      build: true,
      type: 'Prekyba',
      title: 'Prekybos patalpos, blokas 6',
      area: 504,
      floor: 'I + antresolė',
      price: 0,
      from: 'Statoma · rezervuokite',
      updated: '2026-10-06',
      photos: ['assets/img/stock/blokas-6.png', 'assets/img/stock/vizualizacija-1.jpg', 'assets/img/stock/vizualizacija-2.jpg', 'assets/img/stock/statybos-1.jpg', 'assets/img/stock/statybos-2.jpg'],
      video: 'assets/video/statybos.mp4',
      videoTitle: 'Statybų eiga, 2026 m. spalis',
      summary: 'Blokas 6 iš 7: 432 m² pirmame aukšte ir 72 m² antresolė. Priekyje biuras ar parduotuvė, gale prekybos salė ar sandėlis.',
      description: [
        'Naujame prekybos paskirties pastate Jovarų g. 2 statomas blokas Nr. 6: 432 m² pirmame aukšte ir 72 m² antresolė antrame aukšte, iš viso 504 m².',
        'Priekinėje dalyje pirmame ir antrame aukštuose po 72 m² pritaikyta biurui ar pardavimams, čia galima įrengti darbo vietas. Pagal pastato baigtumo aprašą bus įrengta laiptinė į antresolę, elektros instaliacija, apšvietimas ir interneto įvadai.',
        'Likusi patalpos dalis — prekybos salė ar sandėlis: pramoninės šlifuoto betono grindys, pramoniniai vartai sunkiajam transportui, šildymas, vėdinimas ir kondicionavimas.',
        'Patalpą jau galima rezervuoti: susisiekite, aptarsime sąlygas ir įsikėlimo laiką.'
      ],
      specs: [
        { icon: 'ph-frame-corners', label: 'Plotas', value: '504 m²' },
        { icon: 'ph-buildings', label: 'Blokas', value: '6 iš 7 (2 pastatas)' },
        { icon: 'ph-stack', label: 'I aukštas + antresolė', value: '432 + 72 m²' },
        { icon: 'ph-briefcase', label: 'Biuras / pardavimai', value: '72 m² I a. + 72 m² II a.' },
        { icon: 'ph-square', label: 'Grindys', value: 'Šlifuotas betonas' },
        { icon: 'ph-truck', label: 'Vartai', value: 'Pramoniniai, sunkiajam transportui' }
      ],
      services: [
        { icon: 'ph-lightning', label: 'Elektra' },
        { icon: 'ph-thermometer-simple', label: 'Šildymas' },
        { icon: 'ph-wind', label: 'Vėdinimas' },
        { icon: 'ph-snowflake', label: 'Kondicionavimas' },
        { icon: 'ph-siren', label: 'Apsaugos signalizacija' },
        { icon: 'ph-fire-extinguisher', label: 'Gaisrinė signalizacija' },
        { icon: 'ph-wifi-high', label: 'Internetas' }
      ]
    },
    {
      id: 'prekyba-blokas-7',
      object: 'jovaru-2',
      build: true,
      type: 'Prekyba',
      title: 'Prekybos patalpos, blokas 7',
      area: 504,
      floor: 'I + antresolė',
      price: 0,
      from: 'Statoma · rezervuokite',
      updated: '2026-10-07',
      photos: ['assets/img/stock/blokas-7.png', 'assets/img/stock/vizualizacija-1.jpg', 'assets/img/stock/vizualizacija-2.jpg', 'assets/img/stock/statybos-1.jpg', 'assets/img/stock/statybos-2.jpg'],
      video: 'assets/video/statybos.mp4',
      videoTitle: 'Statybų eiga, 2026 m. spalis',
      summary: 'Blokas 7 iš 7: 432 m² pirmame aukšte ir 72 m² antresolė. Priekyje biuras ar parduotuvė, gale prekybos salė ar sandėlis.',
      description: [
        'Naujame prekybos paskirties pastate Jovarų g. 2 statomas blokas Nr. 7: 432 m² pirmame aukšte ir 72 m² antresolė antrame aukšte, iš viso 504 m².',
        'Priekinėje dalyje pirmame ir antrame aukštuose po 72 m² pritaikyta biurui ar pardavimams, čia galima įrengti darbo vietas. Pagal pastato baigtumo aprašą bus įrengta laiptinė į antresolę, elektros instaliacija, apšvietimas ir interneto įvadai.',
        'Likusi patalpos dalis — prekybos salė ar sandėlis: pramoninės šlifuoto betono grindys, pramoniniai vartai sunkiajam transportui, šildymas, vėdinimas ir kondicionavimas.',
        'Patalpą jau galima rezervuoti: susisiekite, aptarsime sąlygas ir įsikėlimo laiką.'
      ],
      specs: [
        { icon: 'ph-frame-corners', label: 'Plotas', value: '504 m²' },
        { icon: 'ph-buildings', label: 'Blokas', value: '7 iš 7 (2 pastatas)' },
        { icon: 'ph-stack', label: 'I aukštas + antresolė', value: '432 + 72 m²' },
        { icon: 'ph-briefcase', label: 'Biuras / pardavimai', value: '72 m² I a. + 72 m² II a.' },
        { icon: 'ph-square', label: 'Grindys', value: 'Šlifuotas betonas' },
        { icon: 'ph-truck', label: 'Vartai', value: 'Pramoniniai, sunkiajam transportui' }
      ],
      services: [
        { icon: 'ph-lightning', label: 'Elektra' },
        { icon: 'ph-thermometer-simple', label: 'Šildymas' },
        { icon: 'ph-wind', label: 'Vėdinimas' },
        { icon: 'ph-snowflake', label: 'Kondicionavimas' },
        { icon: 'ph-siren', label: 'Apsaugos signalizacija' },
        { icon: 'ph-fire-extinguisher', label: 'Gaisrinė signalizacija' },
        { icon: 'ph-wifi-high', label: 'Internetas' }
      ]
    }
  ]
};
