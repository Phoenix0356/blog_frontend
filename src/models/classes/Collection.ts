import {collectionAdd, collectionListGet} from "../../api/CollectionApi";

class Collection{
    private static instance:Collection

    constructor() {}

    public static getInstance(){
        if (!this.instance){
            this.instance = new Collection()
        }
        return this.instance
    }

    public async getAllArticleList(username:string){
        return collectionListGet(username)
        .then(resp => {
            if (resp.data.result === 1){
                return resp.data.object
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public async addArticleIntoCollection(data:any){
        await collectionAdd(data)
        .then(resp => {
            if (resp.data.result === 1){
                //todo
            }else {
                alert(resp.data.msg)
            }
        })
    }
}
export default Collection