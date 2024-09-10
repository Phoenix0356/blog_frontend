import RoleTypeEnum from "../models/enums/RoleTypeEnum.ts";

export const getUserRole = (userRoleLevel:number):string=>{
    if (userRoleLevel === 0) return RoleTypeEnum.VISITOR.name
    else if (userRoleLevel === 1) return RoleTypeEnum.MEMBER.name
    else if (userRoleLevel === 2) return RoleTypeEnum.WRITER.name
    else return RoleTypeEnum.ADMIN.name
}



