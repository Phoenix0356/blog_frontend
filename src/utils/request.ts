import axios from "axios";
import router from "../router";

const request = axios.create({
    baseURL: "/api",
    'timeout': 60000
})

request.interceptors.request.use((config) => {
    config.headers['authorization'] = localStorage.getItem('token');
    return config;
})

request.interceptors.response.use(
    async (resp) => {
        if(resp.data.result === 2){
            console.log(resp.data.msg)
            localStorage.clear()
            sessionStorage.clear()
            await router.push('/user/login')
        }
        return resp;
    },
)

export default request