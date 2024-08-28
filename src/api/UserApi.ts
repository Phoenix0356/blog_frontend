import request from "../utils/request"

export const userLogin = (data:any) =>
   request({
        'url':'/user/login',
        'method':'post',
        'data':data
   })

export const userLogout = () =>
    request({
        'url':'/user/logout',
        'method':'post',
    })

export const userRegister = (data:any) =>
    request({
        'url':'/user/register',
        'method':'post',
        'data':data
    })

export const userGetById = (userId:string) =>
    request({
        'url':`/user/visitor/${userId}`,
        'method':'get',
    })

export const userGet = () =>
    request({
        'url':'/user/get/cur',
        'method':'get',
    })

export const userUpdate = (data:any) =>
    request({
        'url':'/user/update',
        'method':'put',
        'data':data
    })

