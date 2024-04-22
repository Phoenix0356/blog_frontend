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
        'method':'delete',
    })

export const userRegister = (data:any) =>
    request({
        'url':'/user/register',
        'method':'post',
        'data':data
    })

export const userGet = () =>
    request({
        'url':'/user/get',
        'method':'get',
    })

