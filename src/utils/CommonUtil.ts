import RoleTypeEnum from "../models/enums/RoleTypeEnum.ts";

export const getUserRole = (userRoleLevel:number):string=>{
    if (userRoleLevel === 0) return RoleTypeEnum.VISITOR.name
    else if (userRoleLevel === 1) return RoleTypeEnum.MEMBER.name
    else if (userRoleLevel === 2) return RoleTypeEnum.WRITER.name
    else return RoleTypeEnum.ADMIN.name
}

export const hashPassword = async (password:string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}



