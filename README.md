# Directorio de Anime - Kitsu API

Aplicación desarrollada con React y Vite para consultar animes desde la API pública de Kitsu, filtrarlos por título y gestionar listas de favoritos y bloqueados con persistencia en `localStorage`.

## Objetivo

Construir una interfaz front-end funcional que consuma una API externa, maneje estado en React, reutilice componentes y aplique buenas prácticas básicas de organización, experiencia de usuario y persistencia local.

## Funcionalidades

- Consulta de animes desde Kitsu API
- Búsqueda por título sobre el conjunto cargado
- Gestión de favoritos
- Gestión de bloqueados
- Persistencia con `localStorage`
- Interfaz responsive para escritorio y móvil
- Manejo visual de estados de carga, error y vacío

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
- La búsqueda actual filtra los resultados ya cargados desde la API.

## Posibles mejoras futuras

- Búsqueda directamente contra la API
- Paginación o botón “cargar más”
- Vista de detalle por anime
- Ordenamiento por título o popularidad

## Autor

Luis Jimenez
