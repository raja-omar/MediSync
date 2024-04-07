import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App.jsx';
import DocLogin from './pages/Login.jsx';
import DocReg from './pages/Register.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
      <DocLogin />
      <DocReg/>
  </React.StrictMode>
);
