import {
    articleAllGet,
    articleContentUpdate, articleDelete,
    articleGet, articleSave,
    articleStaticUpdate,
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
            if (resp.data.result == 1) {
                return resp.data.object
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public async getUserListArticle(strategy?:Strategy|null):Promise<ArticleInterface[]>{
        return articleUserListGet()
        .then( resp => {
            if (resp.data.result == 1){
                return  resp.data.object
            }else {
                alert(resp.data.msg)
                if (strategy) {
                    strategy()
                }
            }
        })
    }

    public async getArticle(articleId:any,strategy?:Strategy|null):Promise<ArticleInterface>{
        return articleGet(articleId)
        .then(resp => {
            if (resp.data.result == 1){
                return resp.data.object
            }else {
                alert(resp.data.msg)
                if (strategy) {
                    strategy()
                }
            }
        })
    }

    public async updateArticleStatic(articleId:string,articleReadCount:number,
                               articleUpvoteCount:number,articleBookmarkCount:number,
                                     articleMessageType:number){
        await articleStaticUpdate({
            articleId: articleId,
            articleReadCount:articleReadCount,
            articleUpvoteCountChange: articleUpvoteCount,
            articleBookmarkCountChange: articleBookmarkCount,
            articleMessageType:articleMessageType
        }).then(resp => {
            if (resp.data.result == 1){
                //Todo
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public async updateArticleContent(articleId:string, articleTitle: string,
                                articleContent: string, strategy: Strategy){
        await articleContentUpdate({
            articleId: articleId,
            articleTitle:articleTitle,
            articleContent:articleContent
        }).then(resp => {
            if (resp.data.result == 1){
               strategy()
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public async saveArticle(articleForm:any,strategy:Strategy){
        await articleSave({
            articleTitle:articleForm.title,
            articleContent:articleForm.content
        }).then(resp =>{
            if (resp.data.result == 1){
                strategy()
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