import request from "../utils/request";

export const collectionArticleListGet = (collectionId: string) =>
    request({
        'url': `/collection/${collectionId}/articles`,
        'method': 'get',
    })

export const collectionGet = (collectionId:string) =>
    request({
        'url': `/collection/get/${collectionId}`,
        'method': 'get',
    })


export const collectionListGet = (username:string) =>
    request({
        'url': `/collection/all?username=${username}`,
        'method': 'get',
    })


export const collectionAdd = (data:any) =>
    request({
        'url': '/collection/add',
        'method': 'post',
        'data':data
    })

export const collectionCreate = (data:any) =>
    request({
        'url': '/collection/save',
        'method': 'post',
        'data':data
    })

export const collectionUpdate = (data:any) =>
    request({
        'url': '/collection/update',
        'method': 'put',
        'data':data
    })

export const collectionDelete = (collectionId:string)  =>
    request({
        'url': `/collection/delete/${collectionId}`,
        'method': 'delete',
    })



