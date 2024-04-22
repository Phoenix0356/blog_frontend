interface ArticleInterface {
    articleId: string;
    articleTitle: string;
    articleContent: string;
    articleReviseTime: string;
    articleUpvoteCount: number;
    articleReadCount: number;
    articleBookmarkCount: number;
    username: string;
    userAvatarURL: string;
}

export default ArticleInterface;
