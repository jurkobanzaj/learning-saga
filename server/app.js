const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8989 }); // відкриває вебсокет на 8989-порті
const users = []; // ініціює масив юзерс до того, як клієнти почнуть конектитися

const broadcast = (data, ws) => {
    wss.clients.forEach((client) => { // перебирає клієнтів вебсокету
        if(client.readyState === WebSocket.OPEN && client !== ws) { // перевіряє стейт клієнта. якшо готовий
            client.send(JSON.stringify(data)); // шле дані
        };
    });
};

wss.on('connection', (ws) => { // обробник конекту
    let index; // це буде юзер айді
    ws.on('message', (message) => { // обробник повідомлень, отримує дані - меседж
        const data = JSON.parse(message); // перетворює рядок на  об'єкт джава скріпт
        switch (data.type) { // перебирає по тайпу
            case 'ADD_USER': { // ед юзер обробляєтсья як повідомлення
                index: users.length // дивиться довжину масиву юзерс, на початку масив порожній
                users.push({ name: data.name, id: index + 1 }) // бере масив юзерс і додає в нього нового користувача
                ws.send(JSON.stringify({ // відповідає клієнтові, що приєднався, перетворює джейсон на рядок
                    type: 'USERS_LIST',
                    users // відповідає списоком користувачів
                }));
                broadcast({ // роздає список користувачів усім іншим клієнтам
                    type: 'USERS_LIST',
                    users
                }, ws);
                break;
            };
            case 'ADD_MESSAGE': 
                broadcast({ // передає повідомлення всім клієнтам, крім того, що повідомлення написав
                    type: 'ADD_MESSAGE', // тип для екшена
                    message: data.message, // дані для екшена
                    author: data.author // дані для екшена
                }, ws);
                break;
            default: break
        };
    });
    ws.on('close', () => { // коли клієнт відконекчується
        users.splice(index, 1); // видалення користувача з масиву юзерс
        broadcast({ // передає всім, крім юзера новий список
            type: 'USERS_LIST',
            users
        }, ws);
    });
});