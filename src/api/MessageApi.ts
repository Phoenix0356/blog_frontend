import request from "../utils/request"

export const messageGet = (messageId:string) =>
    request({
        'url':`/message/article/${messageId}`,
        'method':'get',
    })

export const messageListGet = () =>
    request({
        'url':`/message/article`,
        'method':'get',
    })

export const messageConfirm = (messageType:number) =>
    request({
        'url':`/message/confirm/${messageType}`,
        'method':'put',
    })




