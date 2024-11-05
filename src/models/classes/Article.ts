import {
    articleAllGet,
    articleContentUpdate, articleDelete,
    articleGet, articleSave,
    articleAuthorizedDataUpdate,
    articleUserListGet, articleDataStateGet, articleCommonDataUpdate
} from "../../api/ArticleApi.ts";
import ArticleInterface from "../interfaces/ArticleInterface.ts";
class Article{
    private static instance: Article;

    private constructor() {}
    public static getInstance():Article {
        if (!this.instance){
            this.instance = new Article();
        }
        return this.instance;
    }

    public async getAllArticleList(sortBy:number):Promise<ArticleInterface[]> {
        return articleAllGet(sortBy)
        .then(resp =>{
            if (resp.data.result === 1) {
                return resp.data.object
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public async getUserArticleList():Promise<ArticleInterface[]>{
        return articleUserListGet()
        .then( resp => {
            if (resp.data.result === 1){
                return resp.data.object
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public async getArticle(articleId:any):Promise<ArticleInterface>{
        return articleGet(articleId)
        .then(resp => {
            if (resp.data.result === 1){
                return resp.data.object
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public async getArticleDataState(articleId:any):Promise<number>{
        return articleDataStateGet(articleId)
            .then(resp => {
                if (resp.data.result === 1){
                    return resp.data.object.articleDataState
                }else {
                    alert(resp.data.msg)
                }
            })
    }

    public async updateArticleAuthorizedData(articleId:string, articleDataChangedState:number){
        await articleAuthorizedDataUpdate({
            articleId: articleId,
            articleDataChangedState: articleDataChangedState
        }).then(resp => {
            if (resp.data.result !== 1){
                alert(resp.data.msg)
            }
        })
    }

    public async updateArticleCommonData(articleId:string){
        await articleCommonDataUpdate(articleId).then(resp => {
            if (resp.data.result !== 1){
                alert(resp.data.msg)
            }
        })
    }

    public async updateArticleContent(articleId:string, articleTitle: string,
                                articleContent: string){
        await articleContentUpdate({
            articleId: articleId,
            articleTitle:articleTitle,
            articleContent:articleContent
        }).then(resp => {
            if (resp.data.result !== 1){
                alert(resp.data.msg)
            }
        })
    }

    public async saveArticle(articleForm:any,strategy:Strategy):Promise<ArticleInterface>{
        return articleSave({
            articleTitle:articleForm.title,
            articleContent:articleForm.content
        }).then(resp =>{
            if (resp.data.result === 1){
                strategy()
                return resp.data.object
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public async deleteArticle(articleId:string,strategy:Strategy){
        await articleDelete(articleId)
        .then(resp => {
            if (resp.data.result === 1){
                strategy()
            }else {
                alert(resp.data.msg)
            }
        })
    }

}

export default Article