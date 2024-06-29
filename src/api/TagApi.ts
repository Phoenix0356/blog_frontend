import request from "../utils/request";

export const tagListGet = () =>
    request({
        'url':'/tag/get/all',
        'method':'get',
    })

export const tagArticleGet = (articleId:string) =>
    request({
        'url':`/tag/get/${articleId}`,
        'method':'get',
    })

export const tagSave = (data:any) =>
    request({
        'url':'/tag/save',
        'method':'post',
        'data':data
    })

