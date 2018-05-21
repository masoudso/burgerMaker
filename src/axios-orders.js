import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://reactburger-6a908.firebaseio.com/'
})

export default instance; 