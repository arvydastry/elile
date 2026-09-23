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
        { icon: 'ph-car', label: 'Lengvųjų automobilių aikštelė' }
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
      ev: true
    },
    {
      id: 'jovaru-2',
      name: 'Jovarų g. 2',
      city: 'Kaunas',
      district: 'Veršvai, Vilijampolė',
      zip: 'LT-47190',
      kind: 'Biurų ir sandėlių pastatas',
      lat: 54.9103563,
      lng: 23.8417997,
      photo: 'assets/img/objektai/jovaru-2.jpg',
      lead: 'Biurų ir sandėliavimo pastatas Veršvuose, prie Raudondvario plento ir Vakarinio aplinkkelio (A5).',
      about: [
        'Pastatas patogus įmonėms, kurioms svarbi logistika: iki Raudondvario plento apie 0,3 km, iki Vakarinio aplinkkelio (A5) apie 0,5 km.',
        'Aikštelėje telpa lengvieji automobiliai ir sunkusis transportas. Be biurų, nuomojamos ir sandėliavimo patalpos.'
      ],
      highlights: [
        { icon: 'ph-road-horizon', value: '0,5 km', label: 'iki Vakarinio aplinkkelio (A5)' },
        { icon: 'ph-truck', value: 'Yra', label: 'aikštelė sunkiajam transportui' },
        { icon: 'ph-bus', value: '80 m', label: 'iki Kulautuvos g. stotelės' }
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
        { icon: 'ph-package', label: 'Sandėliavimo patalpos' }
      ],
      poi: [
        { name: 'Kulautuvos g. stotelė', note: 'autobusai', icon: 'ph-bus', lat: 54.9096223, lng: 23.8420398 },
        { name: 'Atominio bunkerio muziejaus stotelė', note: 'autobusai', icon: 'ph-bus', lat: 54.9118618, lng: 23.8443072 },
        { name: 'Raudondvario plentas', note: 'kelias 141', icon: 'ph-road-horizon', lat: 54.9125054, lng: 23.8442153 },
        { name: 'Vakarinis aplinkkelis (A5)', note: 'Via Baltica kryptis', icon: 'ph-road-horizon', lat: 54.9110149, lng: 23.8342765 },
        { name: 'Kauno senamiestis', note: 'Rotušės aikštė', icon: 'ph-map-pin', lat: 54.8968586, lng: 23.8858991 }
      ],
      ev: true
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
    }
  ]
};
