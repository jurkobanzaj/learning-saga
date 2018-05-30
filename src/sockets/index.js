import * as types from '../constants/ActionTypes';
import { addUser, messageReceived, populateUsersList } from '../actions/index';

const setupSocket = (dispatch, username) => {
    const socket = new WebSocket('ws://localhost:8989'); // описує сокети для клієнтів
    socket.onopen = () => { // при конекті запускає екшин, що додає юзера в список користувачів
        socket.send(JSON.stringify({ // перетворює джейсон в рядочки
            type: types.ADD_USER,
            name: username
        }));
    };
    socket.onmessage = (event) => { // слухає, а як отримує нове повідомлення, перебирає типи екшенів
        const data = JSON.parse(event.data); // парсить пейлоад івенту з джейсон у рядки
        switch (data.type) {
            case types.ADD_MESSAGE:
                dispatch(messageReceived(data.message, data.author)); // диспатчить екшин
                break;
            case types.ADD_USER:
                dispatch(addUser(data.name));
                break;
            case types.USERS_LIST: 
                dispatch(populateUsersList(data.users)); // публікує список користувачів
                break;
            default:
                break
        };
    };
    return socket;
};

export default setupSocket;