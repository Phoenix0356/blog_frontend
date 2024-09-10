interface ArticleInterface {
    articleId: string
    articleTitle: string
    articleContent: string
    articleReviseTime: string
    articleUpvoteCount: number
    articleReadCount: number
    articleBookmarkCount: number
    articleDateState:number
    articleUserId:string
    username: string
    userAvatarURL: string
    collectionArticleNote:string
}

export default ArticleInterface;
