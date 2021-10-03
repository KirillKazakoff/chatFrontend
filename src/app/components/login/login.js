/* eslint-disable class-methods-use-this */
import api from '../api';
import './login.css';
import Chat from '../chat/chat';

export default class LoginForm {
    constructor() {
        this.node = document.querySelector('.login');

        this.node.addEventListener('submit', (e) => this.send(e));
    }

    async send(e) {
        e.preventDefault();
        const name = this.node.name.value;

        const postData = {
            user: name,
        };

        const response = await api.user.add(postData);
        if (response.status === 'ok') {
            this.chat = new Chat(name);
        }
        this.node.classList.add('hidden');
    }
}
