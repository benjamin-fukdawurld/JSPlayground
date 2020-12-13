import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Application from './components/Application.component';


ReactDOM.render(
  <React.StrictMode>
    <Application owner="ncsoft" repo="Unreal.js" />
  </React.StrictMode>,
  document.getElementById('root')
);