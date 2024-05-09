import request from "../utils/request";

export const articleGet = (articleId:any) =>
    request({
        'url': `/article/get/${articleId}`,
        'method': 'get'
    })


export const articleAllGet = (sortBy:number) =>
    request({
        'url':`/article/get/all?sortBy=${sortBy}`,
        'method':'get'
    })

export const articleUserListGet = () =>
    request({
        'url':'/article/list',
        'method':'get'
    })
export const articleSave = (data:any) =>
    request({
        'url':'/article/save',
        'method':'post',
        'data':data
    })

export const articleStaticUpdate = (data:any) =>
    request({
        'url':'/article/update/statics',
        'method':'put',
        'data':data
    })

export const articleContentUpdate = (data:any) =>
    request({
        'url':'/article/update/content',
        'method':'put',
        'data':data
    })

export const articleDelete = (articleId:string) =>
    request({
        'url':`/article/delete/${articleId}`,
        'method':'delete',
    })

