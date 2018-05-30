import { takeEvery } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';

const handleNewMessage = function* handleNewMessage(params) { // бере нове повідомлення
    yield takeEvery(types.ADD_MESSAGE, (action) => {
        action.author = params.username // поле автор перетворює на параметр юзернейм
        params.socket.send(JSON.stringify(action)) // відправляє виправлений пакет екшинам в сокет
    });
};

export default handleNewMessage;