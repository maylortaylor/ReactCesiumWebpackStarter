import './styles/main.scss';

import AppComponent from './app/app';
import React from 'react';
import ReactDOM from 'react-dom/client';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(<AppComponent key={'app-root'} />);
