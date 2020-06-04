import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-my-burger-264b5.firebaseio.com/'
});

export default axios;