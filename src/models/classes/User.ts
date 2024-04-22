import {userGet, userLogin, userLogout, userRegister} from "../../api/user.ts";
import UserInterface from "../interfaces/UserInterface.ts";

class User{
    private static instance: User;

    private constructor() {}
    public static getInstance():User {
        if (!this.instance){
            this.instance = new User();
        }
        return this.instance;
    }

    public getUser ():Promise<UserInterface> {
        return userGet()
        .then((resp)=>{
            if (resp.data.result == 1) {
                return resp.data.object
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public logout(strategy:Strategy) {
        userLogout()
        .then(resp =>{
            if (resp.data.result == 1) {
                localStorage.clear();
                strategy()
            }else {
                alert(resp.data.msg)
            }
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    public login(username:string,password:string,strategy:Strategy):Promise<string>{
        return userLogin({
            username: username,
            password: password
        })
        .then(resp => {
            if (resp.data.result == 1){
                strategy()
                return resp.data.object.token
            }else {
                alert(resp.data.msg)
            }
        }).catch(error => {
            console.log(error.response)
        })
    }
    public register(username:string,password:string,
                    avatarBase64:string,strategy:Strategy):Promise<string> {
        return userRegister({
            username: username,
            password: password,
            avatarBase64: avatarBase64
        })
        .then(resp => {
            if (resp.data.result == 1){
                strategy()
                return resp.data.object.token
            }else {
                alert(resp.data.msg)
            }
        })
    }
}
export default User