import request from "../utils/request"

export const commentGet = (commentId:string) =>
    request({
        'url':`/comment/visitor/${commentId}`,
        'method':'get',
    })


export const commentArticleList = (data:string) =>
    request({
        'url':`/comment/visitor/all?articleId=${data}`,
        'method':'get',
    })

export const commentSave = (data:any) =>
    request({
        'url':'/comment/save',
        'method':'post',
        'data':data
    })

export const commentUpdate = (data:any) =>
    request({
        'url':'/comment/update',
        'method':'put',
        'data':data
    })

export const commentDelete = (commentId:string) =>
    request({
        'url':'/comment/update',
        'method':'delete',
        'data':commentId
    })