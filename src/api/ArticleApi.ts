import request from "../utils/request";

export const articleGet = (articleId:any) =>
    request({
        'url': `/article/${articleId}`,
        'method': 'get'
    })


export const articleAllGet = (sortBy:number) =>
    request({
        'url':`/article/all?sortBy=${sortBy}`,
        'method':'get'
    })

export const articleUserListGet = () =>
    request({
        'url':'/article/list',
        'method':'get'
    })

export const articleDataStateGet = (articleId:any) =>
    request({
        'url': `/article/data/${articleId}`,
        'method': 'get'
    })

export const articleSave = (data:any) =>
    request({
        'url':'/article/save',
        'method':'post',
        'data':data
    })

export const articleAuthorizedDataUpdate = (data:any) =>
    request({
        'url':'/article/update/data',
        'method':'put',
        'data':data
    })
export const articleCommonDataUpdate = (articleId:string) =>
    request({
        'url': `/article/update/${articleId}`,
        'method': 'put'
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

