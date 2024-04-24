import request from "../utils/request"

export const commentGet = (commentId:string) =>
    request({
        'url':'/comment/get',
        'method':'get',
        'data':commentId
    })


export const commentArticleList = (data:string) =>
    request({
        'url':`/comment/all?articleId=${data}`,
        'method':'get',
    })

export const commentSave = (commentContent:any) =>
    request({
        'url':'/comment/save',
        'method':'post',
        'data':commentContent
    })

