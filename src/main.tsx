import 'react-app-polyfill/ie11';

import { createRoot } from 'react-dom/client';

import 'regenerator-runtime/runtime';
import 'core-js/features/array/find';
import 'core-js/features/array/includes';
import 'core-js/features/number/is-nan';
import 'core-js/features/promise';
import 'core-js/features/object/assign';
import 'core-js/features/symbol';

import App from './app';

createRoot(document.getElementById('root')!).render(<App />);
