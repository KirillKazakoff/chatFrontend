/* eslint-disable class-methods-use-this */
import api from '../api';

export default class Chat {
    constructor(userName) {
        this.userName = userName;
        this.node = document.querySelector('.chat');
        this.node.classList.remove('hidden');

        this.mesContainer = this.node.querySelector('.messages');
        this.avatarsContainer = this.node.querySelector('.user-list');

        this.node.addEventListener('submit', (e) => this.onSubmit(e));

        this.ws = new WebSocket('ws://localhost:9091/ws');
        // this.ws = new WebSocket('wss://my-chat-bruh.herokuapp.com/wss');

        this.ws.addEventListener('message', (e) => this.onWsMessage(e));

        const sendLogin = JSON.stringify({ login: userName });
        this.ws.addEventListener('open', () => this.ws.send(sendLogin));
    }

    async onSubmit(e) {
        e.preventDefault();

        const message = this.node.message.value;
        const messageData = {
            message,
            name: this.userName,
        };

        if (!message) return;

        this.ws.send(JSON.stringify(messageData));
        const htmlMes = await api.message.send(messageData);
        this.mesContainer.insertAdjacentHTML('beforeend', htmlMes);

        this.node.message.value = '';
    }

    onWsMessage(e) {
        const { data } = e;
        const response = JSON.parse(data);

        if (response.msgHtml) {
            this.mesInsert(response.msgHtml);
            return;
        }

        if (response.usrHtml) {
            this.avaInsert(response.usrHtml.usrHtml);
            return;
        }

        if (response.delUsrName) {
            this.disconnectUser(response.delUsrName);
            return;
        }

        response.messages.forEach((msg) => this.mesInsert(msg));

        response.avatars.forEach((ava) => {
            if (ava.userName === this.userName) return;
            this.avaInsert(ava.usrHtml);
        });
    }

    disconnectUser(usrName) {
        const nodes = [...this.avatarsContainer.children];
        nodes.some((node) => {
            const name = node.querySelector('.user-name');
            const check = name.textContent === usrName;

            if (check) {
                node.remove();
                return true;
            }
            return false;
        });
    }

    mesInsert(mesHtml) {
        if (mesHtml === 'empty') return;
        this.mesContainer.insertAdjacentHTML('beforeend', mesHtml);
    }

    avaInsert(usrHtml) {
        this.avatarsContainer.insertAdjacentHTML('beforeend', usrHtml);
    }
}
