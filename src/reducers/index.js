import { combineReducers } from 'redux';
import messages from './messages';
import users from './users';

const chat = combineReducers({ // поєднання двох редюсерів з різних файлів / різних функцій
    messages,
    users
});

export default chat;