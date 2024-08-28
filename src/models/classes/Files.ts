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
                return resp.data.result === 1;
            })
    }


}
export default Files