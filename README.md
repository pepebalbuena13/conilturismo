# Costa de la Luz Guide

Directorio turístico en 4 idiomas (ES/EN/DE/FR) de Conil de la Frontera,
Chiclana de la Frontera / Novo Sancti Petri, Barbate, Vejer de la Frontera y
Zahara de los Atunes, construido con [Astro](https://astro.build) + Tailwind
CSS.

## Stack y por qué

- **Astro (SSG)**: cada página se genera como HTML estático en build time →
  SEO local real (metadatos, hreflang, sitemap, URLs limpias) sin renunciar
  a interactividad puntual (carruseles, buscador) via islas de JS vanilla.
- **Tailwind CSS v4**: sistema de diseño (color, tipografía, sombras,
  radios) declarado una vez en `src/styles/global.css` con `@theme`.
- **Datos en JSON** (`src/data/`), totalmente separados del diseño: añadir
  un negocio, una categoría o un pueblo nuevo no toca ni una línea de HTML.

## Idiomas

Español es el idioma por defecto (sin prefijo de URL). Inglés, alemán y
francés viven bajo `/en/`, `/de/` y `/fr/`. Tanto los textos fijos de la
interfaz como el contenido dinámico (nombres, descripciones, horarios,
ubicaciones y reseñas de cada negocio) están traducidos en los 4 idiomas.
El selector de idioma en la cabecera enlaza siempre a la página equivalente
exacta (mismo pueblo, categoría o negocio) en el idioma elegido, nunca a la
home.

Incluso las URLs están traducidas por idioma:

| | Pueblo | Categoría (ej. restaurantes) | Ficha de negocio | Buscador |
|---|---|---|---|---|
| ES | `/conil-de-la-frontera/` | `/conil-de-la-frontera/restaurantes/` | `/negocio/:slug/` | `/buscar/` |
| EN | `/en/conil-de-la-frontera/` | `/en/conil-de-la-frontera/restaurants/` | `/en/business/:slug/` | `/en/search/` |
| DE | `/de/conil-de-la-frontera/` | `/de/conil-de-la-frontera/restaurants/` | `/de/betrieb/:slug/` | `/de/suche/` |
| FR | `/fr/conil-de-la-frontera/` | `/fr/conil-de-la-frontera/restaurants/` | `/fr/commerce/:slug/` | `/fr/recherche/` |

## Arrancar en local

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check + build estático en dist/
npm run preview   # sirve el build de producción
```

## Estructura

```
src/
  data/
    towns.json        # los 5 pueblos: textos, zonas, carrusel — ES/EN/DE/FR
    businesses.json    # negocios: nombre, categoría, precio, horario,
                        # contacto, ubicación, galería, reseñas — ES/EN/DE/FR
    categories.ts       # las 5 categorías + tags de actividades, 4 idiomas
  i18n/
    es.json / en.json / de.json / fr.json   # textos fijos de interfaz
  lib/
    business.ts         # helpers de lectura/filtrado/orden de negocios
    i18n.ts              # t(locale, "clave.anidada")
    paths.ts              # generación de URLs por idioma (segmentos
                           # traducidos incluidos) + helpers de hreflang
    placeholder.ts         # paleta + iniciales para el fallback visual
  components/            # Header, Carousel, BusinessCard, MapEmbed, etc.
  views/                  # vistas reutilizadas por cada página-idioma:
                           # HomeView, TownView, BusinessView, SearchView
  layouts/BaseLayout.astro
  pages/
    index.astro                        # home ES              → /
    [town]/[...category].astro         # pueblo ES              → /:pueblo/(:categoria)/
    negocio/[slug].astro               # ficha ES                → /negocio/:slug/
    buscar/index.astro                 # buscador ES               → /buscar/
    [locale]/index.astro               # home EN/DE/FR                → /:locale/
    [locale]/[town]/[...category].astro # pueblo EN/DE/FR               → /:locale/:pueblo/(:categoria)/
    [locale]/[segment]/index.astro      # buscador EN/DE/FR               → /:locale/:segmento/
    [locale]/[segment]/[slug].astro     # ficha EN/DE/FR                    → /:locale/:segmento/:slug/
public/
  images/<pueblo>/<negocio-o-hero>/1.jpg…  # fotos reales (ver README ahí)
```

Cada página física en `src/pages` es un archivo muy pequeño: declara sus
rutas con `getStaticPaths` y delega todo el marcado en la vista
correspondiente de `src/views/`. Así el español (sin prefijo) y los otros
tres idiomas comparten exactamente el mismo componente, sin duplicar HTML.

## Añadir contenido sin tocar código

- **Un negocio nuevo**: añade un objeto a `src/data/businesses.json` con
  sus 4 idiomas (copia uno existente de su categoría como plantilla).
  Aparece automáticamente en su pueblo, en su categoría y en el buscador,
  en los 4 idiomas.
- **Un pueblo nuevo**: añade un objeto a `src/data/towns.json` (también
  con los 4 idiomas). Astro genera sus rutas automáticamente vía
  `getStaticPaths`.
- **Un idioma nuevo**: añade el código a `LOCALES` en
  `src/data/categories.ts`, crea `src/i18n/<codigo>.json`, añade sus
  segmentos de URL en `src/lib/paths.ts` (`SEARCH_SEGMENT`,
  `BUSINESS_SEGMENT`) y añade el campo correspondiente a cada texto
  localizado en `towns.json` / `businesses.json`.
- **Fotos reales**: coloca los archivos en
  `public/images/<slug-pueblo>/<slug-negocio>/1.jpg`, `2.jpg`… (ver
  `public/images/README.md`). Mientras no exista el archivo, se muestra
  una ilustración de respaldo generada (degradado + iniciales del
  negocio) — nunca una imagen rota.

## Notas sobre el mapa embebido

Las fichas de negocio usan un iframe de OpenStreetMap (sin necesidad de
API key). Si el entorno donde se revisa este proyecto bloquea peticiones
salientes a `openstreetmap.org`, el mapa no cargará en ese entorno
concreto, pero funcionará con normalidad en un navegador real.

## Datos de ejemplo

Los 40 negocios incluidos son de ejemplo (nombres ficticios, coordenadas
aproximadas a cada pueblo) pensados para poblar el directorio y probar
todas las categorías y estados (destacado, sin fotos, etc.). Sustitúyelos
por negocios reales editando `businesses.json`.
