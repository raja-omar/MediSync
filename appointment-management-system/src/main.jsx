import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App.jsx';
import DoctorScreen from './pages/DoctorScreen.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <DoctorScreen />
  </React.StrictMode>
);
