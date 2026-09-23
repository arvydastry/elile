# UAB „Elile“ svetainės dizaino maketas

**Gyva peržiūra:** https://arvydastry.github.io/elile/
(Salient gidas: https://arvydastry.github.io/elile/salient-gidas.html)

Naujo [elile.lt](https://www.elile.lt/Nuomojamos-patalpos-KDonelaicio-g-786.html) dizaino maketas. Svetainė bus daroma
su WordPress ir Salient tema, todėl makete naudojami tik tokie efektai, kuriuos Salient atkartoja savo elementais:
išdėstymas ir elementai paimti iš Salient [SaaS](https://themenectar.com/salient/saas/) ir
[Architect](https://themenectar.com/salient/architect/) demo.

Pagrindinė užduotis: aiškiai parodyti, kokie pastatai yra, kokiu adresu ir kiek juose laisvų patalpų.
Atsilaisvinusi patalpa įdedama, išnuomota išimama, o sąrašai, skaičiai ir žemėlapis atsinaujina patys.
Elektromobilių stotelių veikla į bendrą dizainą neįtraukta; įkrovimo galimybė paminėta tik objekto ir
patalpos puslapiuose.

## Failai

| Failas | Kas tai |
|---|---|
| `index.html` | Pradžia: hero, du objektai, laisvos patalpos, žemėlapis, privalumai, Kauno juosta, žingsniai, pranešimai, DUK, kontaktai |
| `patalpos.html` | Visos laisvos patalpos su filtrais (pastatas, paskirtis, plotas, rikiavimas) ir prilipusiu žemėlapiu |
| `objektas.html?id=donelaicio-33` | Objekto puslapis (tas pats šablonas ir `?id=jovaru-2`) |
| `patalpa.html?id=donelaicio-33-v-4082` | Patalpos puslapis: nuotraukos, kaina, faktai, žemėlapis, apžiūros užklausa |
| `salient-gidas.html` | Kaip maketą perkelti į WordPress su Salient: patalpų valdymas, nustatymai, sekcijos, formos, kodas |
| `assets/js/data.js` | Pastatai ir patalpos (maketo „duomenų bazė“) |
| `assets/js/main.js` | Salient efektų atkartojimas, sąrašai, filtrai, žemėlapiai, formos |
| `assets/css/style.css` | Stiliai |
| `assets/img/` | Logotipas (`elile-logo.svg`, `elile-logo-sviesus.svg`), ikona, pastatų ir patalpos nuotraukos iš elile.lt |

## Peržiūra

Atidarykite `index.html` naršyklėje arba paleiskite vietinį serverį:

```bash
python3 -m http.server 8771
```

ir eikite į http://localhost:8771. Nuotraukos, video, šriftai ir žemėlapis kraunami iš interneto.

## Ką verta žinoti peržiūrint

- Tamsi juosta viršuje skirta tik maketui, į WordPress ji nekeliama.
- Mygtukas **„Patalpų valdymas“** parodo, kaip veiks svetainė: išjunkite patalpą ir ji dingsta iš sąrašų,
  žemėlapio ir skaičių (WordPress'e tai būtų įrašo perkėlimas į juodraštį). Būsena išsaugoma tik jūsų naršyklėje.
- **Tikri duomenys** iš elile.lt: abu pastatai, jų komunikacijos, laisva patalpa 40,82 m² V aukšte
  (7,50 €/m² + PVM), kontaktai ir rekvizitai. **Keturios patalpos pažymėtos „Pavyzdys“**: jos parodo, kaip atrodys
  sąrašas, kai laisvų patalpų bus daugiau. Valdymo skydelyje išjungus „Rodyti pavyzdines patalpas“ matosi
  dabartinė padėtis: Jovarų g. 2 laisvų patalpų nėra, rodomas pranešimas su prenumerata.
- Atstumai (stotelės, Laisvės alėja, Vakarinis aplinkkelis) apskaičiuoti tiesia linija pagal OpenStreetMap koordinates.
- Formos duomenų nesiunčia, tik parodo, kaip veiks.
- Logotipas yra pasiūlymas (du pastatai), el. paštas `info@elile.lt` dar nepatvirtintas.

## Laukiantys patikslinimai

Surašyti gido skyriuje „Patikslinti su klientu“: el. paštas, logotipas, pastatų aprašymai, kas įeina į kainą,
DUK atsakymai, originalios nuotraukos, elektromobilių įkrovimo sąlygos ir senas elektromobilių puslapis.
