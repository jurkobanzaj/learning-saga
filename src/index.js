import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import setupSocket from './sockets/index';
import reducers from './reducers/index';
import handleNewMessage from './sagas';
import username from './utils/name';

const sagaMiddleware = createSagaMiddleware(); // підключає сагу
const store = createStore(reducers, applyMiddleware(sagaMiddleware)); // створює стор
const socket = setupSocket(store.dispatch, username); // підключає сокет

sagaMiddleware.run(handleNewMessage, { socket, username }); // підключає сокет і користувача для обробки нових повідомлень

ReactDOM.render( // наступний рядок передає стор всім компонентам
    <Provider store={store}> 
        <App />
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
