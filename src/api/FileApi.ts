import request from "../utils/request.ts";

export const fileUpload = (data:any) =>
    request({
        'url':'/filter/upload',
        'method':'post',
        'data':data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })