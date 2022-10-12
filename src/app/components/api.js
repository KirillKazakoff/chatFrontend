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
        const response = await fetch(this.baseUrl + url, settings);

        if (!response.ok) {
            throw new Error(`Api error ${response.statusText}`);
        }

        return response;
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
console.log(process.env.NODE_ENV);
const api = new Api(url);

export default api;
