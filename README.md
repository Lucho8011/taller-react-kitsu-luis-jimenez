# Directorio de Anime - Kitsu API

Aplicación desarrollada con React y Vite para consultar animes desde la API pública de Kitsu, filtrarlos por título y gestionar listas de favoritos y bloqueados con persistencia en `localStorage`.

## Objetivo

Construir una interfaz front-end funcional que consuma una API externa, maneje estado en React, reutilice componentes y aplique buenas prácticas básicas de organización, experiencia de usuario y persistencia local.

## Funcionalidades

- Consulta de animes desde Kitsu API
- Búsqueda remota por título sobre la API de Kitsu
- Paginación incremental con botón “Cargar más”
- Gestión de favoritos
- Gestión de bloqueados
- Persistencia con `localStorage`
- Interfaz responsive para escritorio y móvil
- Manejo visual de estados de carga, error y vacío
- Despliegue público en Vercel

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- CSS
- ESLint

## Estructura principal

- `src/App.jsx`: composición general de la aplicación
- `src/components/`: componentes visuales reutilizables
- `src/hooks/useFetch.js`: consulta de datos a la API
- `src/hooks/useLocalStorage.js`: persistencia local de favoritos y bloqueados

## Arquitectura y decisiones clave

- `App.jsx` centraliza la coordinación entre búsqueda, paginación, favoritos y bloqueados.
- `useFetch` encapsula la lógica de consulta remota, manejo de error, cancelación con `AbortController` y anexado de páginas.
- `useLocalStorage` reutiliza la persistencia local para favoritos y bloqueados.
- Los animes bloqueados se excluyen visualmente del catálogo.
- Si un anime se bloquea, se elimina de favoritos para evitar inconsistencias entre listas.
- La búsqueda usa debounce para reducir llamadas innecesarias a la API.
- La paginación acumula resultados sin duplicarlos cuando se cargan nuevas páginas.

## Cómo ejecutar el proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar entorno de desarrollo:

```bash
npm run dev
```

3. Generar build de producción:

```bash
npm run build
```

4. Revisar calidad del código:

```bash
npm run lint
```

## Decisiones técnicas

- Se usó un hook `useFetch` para separar la lógica de consumo de API.
- Se usó un hook `useLocalStorage` para reutilizar la persistencia local.
- Los animes bloqueados no se muestran en el catálogo.
- Si un anime se bloquea, se elimina automáticamente de favoritos para evitar estados inconsistentes.
- La búsqueda consulta resultados reales desde la API de Kitsu.
- La paginación incremental permite cargar más resultados sin perder el contexto actual.

## Demo desplegada

- Producción en Vercel: [taller-react-kitsu-luis-jimenez.vercel.app](https://taller-react-kitsu-luis-jimenez.vercel.app/)

## Posibles mejoras futuras

- Vista de detalle por anime
- Ordenamiento por título o popularidad
- Filtros adicionales por estado, temporada o clasificación
- Mejoras visuales con animaciones sutiles y estados de transición

## Autor

Luis Jimenez
