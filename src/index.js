import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();


export const Desktop = () => {
  return (
    <div className="desktop">
      <div className="div">
        <div className="text-wrapper">Soter’s Way</div>
        <div className="rectangle" />
        <div className="text-wrapper-2">Origin</div>
        <div className="text-wrapper-3">Destination</div>
        <p className="p">Your destination has a fairly high chance of crashing!!! SELECT A DIFFERENT ROAD</p>
        <div className="origin-box" />
        <div className="destination-box" />
        <img className="vector" alt="Vector" src="vector-2.png" />
      </div>
    </div>
  );
};