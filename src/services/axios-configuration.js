import axios from 'axios';

// const api = axios.create({baseURL: 'http://localhost:3001'});
const api = axios.create({baseURL: 'https://payball-backend.herokuapp.com/'});

export default api;