
export const getUserRole = (userRoleLevel:number):string=>{
    if (userRoleLevel === 0) return "游客"
    else if (userRoleLevel === 1) return "成员"
    else if (userRoleLevel === 2) return "内容发布者"
    else return "管理员"
}