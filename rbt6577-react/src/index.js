import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Categories from './components/categories.js'
import reportWebVitals from './reportWebVitals';

const categories = ["Proteins", "Fruits", "Vegetables", "Dairy", "Grains"]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Categories categories={categories}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
