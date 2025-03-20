# Nord homework

A React-based app made during my recruitment process for Nord Security. It covers following requirements of the task:

- relies on ES6+ syntax and features
- utilises both `Context API` and `react-query`
- written in `TypeScript`
- SPA with routing implemented in `react-router`
- token based authentication and authorization, with user session
- displays list of servers
- compatible with IE11+ // TODO

## Installation

1. Clone the repository
   ```
   git clone https://github.com/pmgalecki/nord-homework
   cd nord-homework
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```
   This will launch the app in development mode, by default at http://localhost:5173

4. For production build and preview
   ```
   npm run build
   npm run preview
   ```
   This builds the app for production and then serves the built files locally at http://localhost:4173

## Important information

- This app is scaffolded with `Vite` wich requires `Node.js` version 18+ or 20+. (see https://vite.dev/guide/#scaffolding-your-first-vite-project)

## Possible improvements

- more advanced pagination with changing rows per page
- filtering list by server name
