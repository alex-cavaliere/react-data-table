import React from 'react';
import ReactDOM from 'react-dom/client';
import DataTable from '../src/lib/index';

const data = [];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataTable data={data}/>
  </React.StrictMode>
);
