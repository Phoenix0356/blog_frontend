import {messageConfirm, messageGet, messageListGet} from "../../api/MessageApi.ts";

class Messages {
    private static instance: Messages;

    private constructor() {}
    public static getInstance():Messages {
        if (!this.instance){
            this.instance = new Messages();
        }
        return this.instance;
    }

    public async getMessage(messageId:string){
        return messageGet(messageId)
        .then(resp =>{
            if (resp.data.result == 1){
                return resp.data.object
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public async getMessageList(){
        return messageListGet()
        .then(resp =>{
            if (resp.data.result == 1){
                return resp.data.object
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public async confirmMessage(messageType:number){
        return messageConfirm(messageType)
        .then(resp =>{
            return resp.data.result == 1;
        })
    }
}
export default Messages