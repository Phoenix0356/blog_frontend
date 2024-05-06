import {
    collectionAdd,
    collectionArticleListGet,
    collectionCreate,
    collectionGet,
    collectionListGet
} from "../../api/CollectionApi";

class Collection{
    private static instance:Collection

    constructor() {}

    public static getInstance(){
        if (!this.instance){
            this.instance = new Collection()
        }
        return this.instance
    }

    public async getAllArticleList(collectionId:string){
        return collectionArticleListGet(collectionId)
            .then(resp => {
            if (resp.data.result === 1){
                return resp.data.object
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public async getCollection(collectionId:string){
        return collectionGet(collectionId)
        .then(resp => {
            if (resp.data.result === 1){
                return resp.data.msg
            }else{
                alert(resp.data.msg)
            }
        })
    }

    public async getCollectionList(username:string){
        return collectionListGet(username)
        .then(resp => {
            if (resp.data.result === 1){
                return resp.data.object
            }else {
                resp.data.msg
            }
        })
    }

    public async addArticleIntoCollection(data:any){
        return collectionAdd(data)
        .then(resp => {
            return resp.data.result === 1;
        })
    }

    public async createCollection(data:any){
        return collectionCreate(data)
        .then(resp => {
            if (resp.data.result === 1){
                return true
            }else {
                alert(resp.data.msg)
                return false
            }
        })
    }
}
export default Collection