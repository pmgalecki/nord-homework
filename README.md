# Nord homework

A React-based app made during my recruitment process for Nord Security. It covers following requirements of the task:

- relies on ES6+ syntax and features
- utilises both `Context API` and `react-query`
- written in `TypeScript`
- SPA with routing implemented in `react-router`
- token based authentication and authorization, with user session
- displays list of servers

I wanted to share my experience attempting to configure a bundler for IE11 compatibility. Unfortunately, despite considerable effort, I wasn't able to achieve a working solution. I encountered two major challenges:

1. **Testing Environment Limitations**: Setting up a proper IE11 testing environment on my Apple machine proved difficult. Without direct access to IE11,
validating any configuration changes became a time-consuming process involving virtual machines or external testing services.
Ultimately I managed to get access to Windows based computer and emulated Internet Explorer on th Edge browser.

2. **Vite Compatibility Issues**: Finding a working solution with Vite specifically for IE11 was particularly challenging.
Vite is optimized for modern browsers, and its ES module-based dev server doesn't support IE11 natively.

I explored several potential solutions:
 * configuring Babel with appropriate polyfills
 * investigating @vitejs/plugin-legacy

To attempts are documented in `ie11` branch.

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
