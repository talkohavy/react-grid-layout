import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { initDAL } from './DAL';
import DarkThemeProvider from './providers/DarkThemeProvider';
import { initSessionManager } from './SessionManager';
import { createStore } from './store';
import './index.css';
import './bootstrap';

const httpClientAxios = axios.create({ baseURL: 'http://localhost:8000', withCredentials: true });

const store = createStore({ preloadedState: {} });

function Client() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initDAL(httpClientAxios);
    initSessionManager();

    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <React.StrictMode>
      <StoreProvider store={store}>
        <BrowserRouter>
          <DarkThemeProvider>
            <App />
          </DarkThemeProvider>
        </BrowserRouter>
      </StoreProvider>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Client />);
