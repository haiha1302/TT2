import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './sass/index.scss';
import { BrowserRouter } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
);
