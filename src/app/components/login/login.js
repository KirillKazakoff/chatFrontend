import api from '../api';
import './login.css';
import Chat from '../chat/chat';
import loader from '../loader/Loader';
import info from '../info/info';

export default class LoginForm {
    constructor() {
        this.form = document.querySelector('.login');

        this.form.addEventListener('submit', (e) => this.send(e));
    }

    async send(e) {
        e.preventDefault();
        const name = this.form.name.value;
        if (!name) {
            info.renderInfo('Введите свое имя', '');
            return;
        }

        const postData = {
            user: name,
        };

        loader.showLoader();
        this.form.classList.add('hidden');
        try {
            const response = await api.user.add(postData);
            if (response.status !== 'ok') {
                info.renderInfo(response.status, '');
                throw new Error(response.status);
            }
            this.chat = new Chat(name);
        } catch (error) {
            this.form.classList.remove('hidden');
        } finally {
            loader.hideLoader();
        }
    }
}
