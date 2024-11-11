

import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from './lib/store.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  );
  