import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { store } from './store/index'
import { Provider } from 'react-redux'


const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter basename="/Netigma7">
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </Provider>,
    rootElement
);

