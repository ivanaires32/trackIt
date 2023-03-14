import React from 'react';
import Global from './GlobalStyled/GlobalStyled';
import ResetCss from './GlobalStyled/Reset'
import ReactDOM from 'react-dom/client';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Global />
    <ResetCss />
    <App />
  </React.StrictMode>
);

