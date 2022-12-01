import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import appconfig from './appconfig';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// 把reCAPTCHA的源切换到CN也能使用的源
// @ts-ignore
window.recaptchaOptions = { useRecaptchaNet: true };

root.render(
  //<React.StrictMode>
  <BrowserRouter basename={appconfig.root}>
    <App />
  </BrowserRouter>
  //</React.StrictMode>
);
