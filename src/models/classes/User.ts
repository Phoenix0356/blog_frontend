import {userGet, userLogin, userLogout, userRegister, userUpdate} from "../../api/UserApi.ts";
import UserInterface from "../interfaces/UserInterface.ts";
import userInterface from "../interfaces/UserInterface.ts";

class User{
    private static instance: User;

    private constructor() {}
    public static getInstance():User {
        if (!this.instance){
            this.instance = new User();
        }
        return this.instance;
    }

    public async getUser ():Promise<UserInterface> {
        return userGet()
        .then((resp)=>{
            if (resp.data.result == 1) {
                return resp.data.object
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public async logout(strategy:Strategy) {
        await userLogout()
        .then(resp =>{
            if (resp.data.result == 1) {
                localStorage.clear()
                sessionStorage.clear()
                strategy()
            }else {
                alert(resp.data.msg)
            }
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    public async login(username:string,password:string,strategy:Strategy):Promise<UserInterface>{
        return userLogin({
            username: username,
            password: password
        })
        .then(resp => {
            if (resp.data.result == 1){
                strategy()
                return resp.data.object
            }else {
                alert(resp.data.msg)
            }
        }).catch(error => {
            console.log(error.response)
        })
    }
    public async register(username:string,password:string,
                    avatarBase64:string,strategy:Strategy):Promise<UserInterface> {
        return userRegister({
            username: username,
            password: password,
            avatarBase64: avatarBase64
        })
        .then(resp => {
            if (resp.data.result == 1){
                strategy()
                return resp.data.object
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public async updateUser(username:string):Promise<userInterface>{
        return userUpdate({
            username:username
        })
        .then(resp => {
            if (resp.data.result === 1){
                return resp.data.object
            }else {
                alert(resp.data.msg)
                return null
            }
        })
    }
}
export default User