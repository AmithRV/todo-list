import axios from 'axios';

const instance = axios.create({
    baseURL: "https://todo-list-backend-a2bs.onrender.com"
});

export default instance