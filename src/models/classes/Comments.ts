import CommentInterface from "../interfaces/CommentInterface";
import {commentGet, commentArticleList, commentSave} from "../../api/CommentApi";

class Comments{
    private static instance: Comments;

    private constructor() {}
    public static getInstance():Comments {
        if (!this.instance){
            this.instance = new Comments();
        }
        return this.instance;
    }

    public async getComment(commentId:string):Promise<CommentInterface>{
        return commentGet(commentId)
        .then(resp =>{
            if (resp.data.result == 1){
                return resp.data.result
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public async getArticleCommentList(articleId:string):Promise<CommentInterface[]>{
        return commentArticleList(articleId)
        .then(resp =>{
            if (resp.data.result == 1){
                return resp.data.object
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public async saveComment(commentContent:string,commentArticleId:string){
        await commentSave({
            commentContent:commentContent,
            commentArticleId:commentArticleId
        }).then(resp => {
            if (resp.data.result == 1){
                //Todo
            } else {
                alert(resp.data.msg);
            }
        })
    }
}

export default Comments

