interface MessageInterface {
    messageId:string;
    messageProducerUsername: string;
    messageType: string;
    messageRelatedArticleName: string;
    messageIsPulled: boolean;
    messageGenerateTime: string;
}

export default MessageInterface;
