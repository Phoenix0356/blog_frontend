const MessageTypeEnum = {
    UPVOTE: {name: "UPVOTE", value: 0b0001},
    UPVOTE_CANCEL: {name: "UPVOTE_CANCEL", value: 0b0010},
    BOOKMARK: {name: "BOOKMARK", value: 0b0100},
    BOOKMARK_CANCEL: {name: "BOOKMARK_CANCEL", value: 0b1000}
}
export default MessageTypeEnum;
