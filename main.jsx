import './style.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/components/App/index.jsx';

// React
const root = createRoot(document.getElementById('app'));
root.render(<App />);


