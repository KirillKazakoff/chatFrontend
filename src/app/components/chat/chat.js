/* eslint-disable class-methods-use-this */
import { getTime } from '../../lib/utils';
import api from '../api';

const socketProd = 'wss://my-chat-bruh.herokuapp.com/wss';
const socketDev = 'ws://localhost:9091/ws';
const socket = process.env.NODE_ENV === 'production' ? socketProd : socketDev;

export default class Chat {
    constructor(userName) {
        this.userName = userName;
        this.node = document.querySelector('.chat');
        this.node.classList.remove('hidden');

        this.mesContainer = this.node.querySelector('.messages');
        this.avatarsContainer = this.node.querySelector('.user-list');

        this.node.addEventListener('submit', (e) => this.onSubmit(e));

        this.ws = new WebSocket(socket);
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
        this.node.message.value = '';

        this.ws.send(JSON.stringify(messageData));
        const htmlMes = await api.message.send(messageData);
        this.mesInsert(htmlMes);
    }

    onWsMessage(e) {
        const { data } = e;
        const response = JSON.parse(data);

        if (response.msgHtml) {
            this.mesInsert(response.msgHtml);
            return;
        }

        if (response.login) {
            response.avatars.forEach((ava) => {
                this.avaInsert(ava.usrHtml);
            });
            if (!response.messages) return;
            response.messages.forEach((msg) => this.mesInsert(msg));
            return;
        }

        if (response.newParticipant) {
            this.avaInsert(response.avatar.usrHtml);
        }

        if (response.delUsrName) {
            this.disconnectUser(response.delUsrName);
        }
    }

    disconnectUser(usrName) {
        const nodes = [...this.avatarsContainer.children];
        nodes.some((node) => {
            const name = node.querySelector('.user__name');
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
        const data = this.mesContainer.lastElementChild.querySelector(
            '.message__header-data',
        );
        data.textContent = getTime();
    }

    avaInsert(usrHtml) {
        this.avatarsContainer.insertAdjacentHTML('beforeend', usrHtml);
    }
}
