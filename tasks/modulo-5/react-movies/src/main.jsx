import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import App from './App.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>,
);
