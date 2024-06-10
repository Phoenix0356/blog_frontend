
export const getUserRole = (userRoleLevel:number):string=>{
    if (userRoleLevel === 0) return "游客"
    else if (userRoleLevel === 1) return "成员"
    else if (userRoleLevel === 2) return "创作者"
    else return "管理员"
}

export const activatedMessageType = (articleMessageType:number,type:number) => {
    if((articleMessageType&type)===0){
        articleMessageType+=type;
    }
    return articleMessageType;
}
