import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { AuthProvider } from './context/AuthContext'; // ייבוא ה-Provider

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

// root.render(
//   <React.StrictMode>
//     {/* עטיפת האפליקציה ב-Provider */}
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </React.StrictMode>
// );