import * as types from '../constants/ActionTypes';

const messages = (state = [], action) => { // обдефолтити стейт, отримати екшн
    switch (action.type) { // пошук по екшн тайп
        case types.ADD_MESSAGE:
        case types.MESSAGE_RECEIVED: // два екшини фактично роблять одне і те ж, тому зліплені докупи
            return state.concat([ // конкат - додати до масиву стейт. можна, мабуть, через ...
                {
                    message: action.message,
                    author: action.author,
                    id: action.id
                }
            ]);
        default:
            return state
    };
};

export default messages;