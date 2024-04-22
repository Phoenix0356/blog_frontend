import {
    articleAllGet,
    articleContentUpdate,
    articleGet, articleSave,
    articleStaticUpdate,
    articleUserListGet
} from "../../api/article.ts";
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

    public getAllArticle():Promise<ArticleInterface[]> {
        return articleAllGet()
        .then(resp =>{
            if (resp.data.result == 1) {
                return resp.data.object
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public getUserListArticle(strategy?:Strategy|null):Promise<ArticleInterface[]>{
        return  articleUserListGet()
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

    public getArticle(articleId:any,strategy?:Strategy|null):Promise<ArticleInterface>{
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

    public updateArticleStatic(articleId:string,articleReadCount:number,
                               articleUpvoteCount:number,articleBookmarkCount:number){
        articleStaticUpdate({
            articleId: articleId,
            articleReadCount:articleReadCount,
            articleUpvoteCount: articleUpvoteCount,
            articleBookmarkCount: articleBookmarkCount
        }).then(resp => {
            if (resp.data.result == 1){
                //Todo
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public updateArticleContent(articleId:string, articleTitle: string,
                                articleContent: string, strategy: Strategy){
        articleContentUpdate({
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

    public saveArticle(articleForm:any,strategy:Strategy){
        articleSave({
            articleTitle:articleForm.title,
            articleContent:articleForm.content
        }).then(resp =>{
            if (resp.data.result == 1){
                strategy()
            }else {
                alert(resp.data.msg)
            }
        }).catch(error => {
            console.log(error.response)
        })
    }

}

export default Article