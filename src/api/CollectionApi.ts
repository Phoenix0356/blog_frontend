import request from "../utils/request";

export const collectionListGet = (username:string) =>
    request({
        'url': `/collection/get/all?username=${username}`,
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


