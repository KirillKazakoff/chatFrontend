import './loader.css';

class Loader {
    constructor() {
        this.loader = document.querySelector('.loader');
    }

    showLoader() {
        this.loader.classList.remove('hidden');
    }

    hideLoader() {
        this.loader.classList.add('hidden');
    }
}

const loader = new Loader();
export default loader;
