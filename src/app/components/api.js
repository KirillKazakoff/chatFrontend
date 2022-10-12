import info from './info/info';

class Api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;

        this.user = {
            add: async (userData) => {
                const res = await this.post('/user/login', userData);
                return res.json();
            },
        };

        this.message = {
            send: async (mesData) => {
                const res = await this.post('/user/sendMes', mesData);
                return res.text();
            },
        };
    }

    async api(url, settings) {
        try {
            const response = await fetch(this.baseUrl + url, settings);
            return response;
        } catch (error) {
            info.renderInfo(
                info.messages.typeLoadError.title,
                info.messages.typeLoadError.desc,
            );
            throw new Error(`Api error ${error.message}`);
        }
    }

    async post(url, postData) {
        return this.api(url, {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
        });
    }
}

const prodUrl = 'https://my-chat-bruh.herokuapp.com';
const devUrl = 'http://localhost:9091';
const url = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;
const api = new Api(url);

export default api;
