import request from "../utils/request";

export const tagListGet = () =>
    request({
        'url':'/tag/all',
        'method':'get',
    })

export const tagArticleGet = (articleId:string) =>
    request({
        'url':`/tag/visitor/${articleId}`,
        'method':'get',
    })

export const tagSave = (data:any) =>
    request({
        'url':'/tag/save',
        'method':'post',
        'data':data
    })

export const tagUpdateToArticle = (data:any) =>
    request({
        'url':'/tag/article/update',
        'method':'post',
        'data':data
    })

export const tagDelete = (tagId:string) =>
    request({
        'url':`/tag/delete/${tagId}`,
        'method':'delete',
    })

export const tagUpdate = (tag:any) =>
    request({
        'url':`/tag/update`,
        'method':'put',
        'data':tag
    })

