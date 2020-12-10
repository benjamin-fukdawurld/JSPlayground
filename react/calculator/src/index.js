import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Calculator from './components/Calculator.component';

import Layouts from './layouts/Layouts';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <Calculator layouts={Layouts} />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
