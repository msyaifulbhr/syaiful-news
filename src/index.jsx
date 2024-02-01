import React from 'react';
import { createRoot } from 'react-dom/client';
import NewsApp from './components/NewsApp';
 
const root = createRoot(document.getElementById('root'));
root.render(<NewsApp />);