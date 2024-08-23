import UserInterface from "../interfaces/UserInterface.ts";
import {userGet} from "../../api/UserApi.ts";


class File{
    private static instance: File;

    private constructor() {}
    public static getInstance():File {
        if (!this.instance){
            this.instance = new File();
        }
        return this.instance;
    }

    public async uploadFile ():Promise<void> {
        return userGet()
            .then((resp)=>{
                if (resp.data.result == 1) {
                    return resp.data.object
                }else {
                    alert(resp.data.msg)
                }
            })
    }


}
export default File