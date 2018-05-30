import * as types from '../constants/ActionTypes';

let nextMessageId = 0;
let nextUserId = 0;

export const addMessage = (message, author) => ({ // нормальні такі собі екшини
    type: types.ADD_MESSAGE,
    id: nextMessageId++, // можна застосувати цю ідею для підрахування кількості відкриттів листа
    message,
    author
});

export const addUser = name => ({
    type: types.ADD_USER,
    id: nextUserId++,
    name
});

export const messageReceived = (message, author) => ({
    type: types.MESSAGE_RECEIVED,
    id: nextMessageId++,
    message,
    author
});

export const populateUsersList = users => ({ // публікація списку. Як у блозі
    type: types.USERS_LIST,
    users
});