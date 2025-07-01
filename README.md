# Comping - Frontend zadatak

 Aplikacija uključuje dashboard s prikazom karte, liste lokacija, tablični i grafički prikaz podataka, te sekciju s prikazom i detaljima o Pokemonima (dohvat s PokeAPI-ja).

## ✅ Sadržaj aplikacije

- **Dashboard**
  - Prikaz OpenStreetMap karte (Leaflet)
  - Lista lokacija s markerima
  - Tablični prikaz agregiranih podataka (`podaci.json`)
  - Grafički prikaz istih podataka (Chart.js)
- **Pokemon sekcija**
  - Dohvat i prikaz podataka s [https://pokeapi.co](https://pokeapi.co)
  - Paginacija (10 po stranici)
  - Detalji o Pokemonu u modal prozoru
- **Transloco** za i18n (postavljen hrvatski jezik)
- **Angular Material** za stilizaciju komponenti

---

## 🚀 Pokretanje aplikacije

### 1. Kloniranje repozitorija

```bash
git clone https://github.com/FilipBugarin/Comping_front.git
```

### 2. Instalacija ovisnosti

Koristiš Angular 17, pa koristiš `npm` v9+:

```bash
npm install
```

Ako koristiš Node 20+, provjeri da nema konflikata s dependency verzijama.

### 3. Pokretanje aplikacije

```bash
npm start
```

ili

```bash
ng serve
```

Aplikacija će biti dostupna na `http://localhost:4200/`.

---

## 📂 Struktura projekta

```
src/
├── app/
│   ├── core/              # Zajedničke komponente, servisi, guardovi
│   ├── modules/
│   │   ├── dashboard/     # Dashboard moduli i komponente
│   │   └── pokemon/       # Pokemon moduli i prikaz
│   ├── assets/
│   │   └── podaci.json    # Izvor podataka za tablicu i graf
```

---

## 🛠 Tehnologije

- Angular 17
- Angular Material
- Leaflet.js (OpenStreetMap)
- Chart.js
- Transloco
- RxJS / Observables
- Tailwind CSS

---

## 📌 Napomene

- Aplikacija koristi **soft-deps loading** i lazy-loaded rute
- Leaflet marker ikone se nalaze u `assets/` (problem s 404 može se riješiti overrideanjem putanje)
- Projekt je organiziran modularno i pripremljen za proširenje

---