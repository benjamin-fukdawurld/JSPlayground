import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Calculator from './components/Calculator.component';


ReactDOM.render(
  <React.StrictMode>
    <div>
      <Calculator />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
