# Costa de la Luz Guide

Directorio turístico bilingüe (ES/EN) de Conil de la Frontera, Chiclana de
la Frontera / Novo Sancti Petri, Barbate, Vejer de la Frontera y Zahara de
los Atunes, construido con [Astro](https://astro.build) + Tailwind CSS.

## Stack y por qué

- **Astro (SSG)**: cada página se genera como HTML estático en build time →
  SEO local real (metadatos, hreflang, sitemap, URLs limpias) sin renunciar
  a interactividad puntual (carruseles, buscador) via islas de JS vanilla.
- **Tailwind CSS v4**: sistema de diseño (color, tipografía, sombras,
  radios) declarado una vez en `src/styles/global.css` con `@theme`.
- **Datos en JSON** (`src/data/`), totalmente separados del diseño: añadir
  un negocio, una categoría o un pueblo nuevo no toca ni una línea de HTML.

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
    towns.json        # los 5 pueblos: textos, zonas, carrusel de cabecera
    businesses.json    # negocios: nombre, categoría, precio, horario,
                        # contacto, ubicación, galería, reseñas (ES/EN)
    categories.ts       # las 5 categorías + tags de actividades
  i18n/
    es.json / en.json   # textos fijos de interfaz (menús, botones, labels)
  lib/
    business.ts         # helpers de lectura/filtrado/orden de negocios
    i18n.ts              # t(locale, "clave.anidada") + helpers de idioma
    paths.ts              # generación de URLs por idioma
    placeholder.ts         # paleta + iniciales para el fallback visual
  components/            # Header, Carousel, BusinessCard, MapEmbed, etc.
  layouts/BaseLayout.astro
  pages/
    index.astro                       # home ES        → /
    en/index.astro                    # home EN        → /en/
    [town]/[...category].astro        # pueblo ES       → /:pueblo/(:categoria)/
    en/[town]/[...category].astro     # pueblo EN       → /en/:town/(:category)/
    negocio/[slug].astro              # ficha ES        → /negocio/:slug/
    en/business/[slug].astro          # ficha EN        → /en/business/:slug/
    buscar/index.astro                # buscador ES     → /buscar/
    en/search/index.astro             # buscador EN     → /en/search/
public/
  images/<pueblo>/<negocio-o-hero>/1.jpg…  # fotos reales (ver README ahí)
```

## Añadir contenido sin tocar código

- **Un negocio nuevo**: añade un objeto a `src/data/businesses.json`
  (copia uno existente de su categoría como plantilla). Aparece
  automáticamente en su pueblo, en su categoría y en el buscador, en los
  dos idiomas.
- **Un pueblo nuevo**: añade un objeto a `src/data/towns.json`. Astro
  genera sus rutas (`/pueblo/`, `/pueblo/categoria/`) automáticamente vía
  `getStaticPaths`.
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
