import {
    articleAllGet,
    articleContentUpdate, articleDelete,
    articleGet, articleSave,
    articleDataUpdate,
    articleUserListGet
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

    public async updateArticleData(articleId:string, articleReadCount:number,
                                   articleDataChangedState:number){
        await articleDataUpdate({
            articleId: articleId,
            articleReadCount:articleReadCount,
            articleDataChangedState:articleDataChangedState
        }).then(resp => {
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
            if (resp.data.result === 1){
            }else {
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