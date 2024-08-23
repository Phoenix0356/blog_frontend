import {fileUpload} from "../../api/FileApi.ts";


class Files {
    private static instance: Files;

    private constructor() {}
    public static getInstance():Files {
        if (!this.instance){
            this.instance = new Files();
        }
        return this.instance;
    }

    public async uploadFile (data:any)  {
        return fileUpload(data)
            .then((resp)=>{
                if (resp.data.result === 1) {
                    return true
                }else{
                    alert(resp.data.msg)
                    return false
                }
            })
    }


}
export default Files