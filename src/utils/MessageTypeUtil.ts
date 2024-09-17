import MessageTypeEnum from "../models/enums/MessageTypeEnum.ts";

export const modifyMutualMessageType = (articleMessageType:number,type1:number,type2:number):number => {
    //使用异或操作来翻转一对互斥事件的消息类型
    return articleMessageType ^ type1 ^ type2
}

export const isUpvote = (articleMessageType:number):boolean => {
    //判断当前状态是已点赞还是未点赞
    return (articleMessageType & MessageTypeEnum.UPVOTE.value) > 0
}