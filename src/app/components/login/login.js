import api from '../api';
import './login.css';
import Chat from '../chat/chat';
import loader from '../loader/Loader';

export default class LoginForm {
    constructor() {
        this.form = document.querySelector('.login');

        this.form.addEventListener('submit', (e) => this.send(e));
    }

    async send(e) {
        e.preventDefault();
        const name = this.form.name.value;

        const postData = {
            user: name,
        };

        loader.showLoader();
        this.form.classList.add('hidden');
        try {
            await api.user.add(postData);
            this.chat = new Chat(name);
        } catch (error) {
            this.form.classList.remove('hidden');
        } finally {
            loader.hideLoader();
        }
    }
}
