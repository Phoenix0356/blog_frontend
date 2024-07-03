import TagInterface from "../interfaces/TagInterface.ts";
import {tagUpdateToArticle, tagArticleGet, tagListGet, tagSave, tagDelete, tagUpdate} from "../../api/TagApi.ts";

class Tag {
    private static instance: Tag;

    private constructor() {
    }

    public static getInstance(): Tag {
        if (!this.instance) {
            this.instance = new Tag();
        }
        return this.instance;
    }

    public async getAllTagList(): Promise<TagInterface[]> {
        return tagListGet()
        .then(resp=>{
            if (resp.data.result == 1) {
                return resp.data.object
            }else {
                alert(resp.data.msg)
            }
        })
    }

    public async getArticleTagList(articleId:string): Promise<TagInterface[]> {
        return tagArticleGet(articleId)
            .then(resp=>{
                if (resp.data.result == 1) {
                    return resp.data.object
                }else {
                    alert(resp.data.msg)
                }
            })
    }

    public async saveTag(data:any): Promise<void> {
        await tagSave({
            tagContent: data.tagContent,
        }).then(resp => {
            if (resp.data.result != 1) {
                alert(resp.data.msg)
            }
        });
    }

    public async updateTagToArticle(data:any): Promise<void> {
        await tagUpdateToArticle({
            articleId: data.articleId,
            tagIdList: data.tagIdList
        }).then(resp => {
            if (resp.data.result != 1) {
                alert(resp.data.msg)
            }
        });
    }

    public async deleteTage(tagId:string): Promise<void> {
        await tagDelete(tagId).then(resp => {
            if (resp.data.result != 1) {
                alert(resp.data.msg)
            }
        });
    }

    public async updateTag(tag:any): Promise<void> {
        await tagUpdate(tag).then(resp => {
            if (resp.data.result != 1) {
                alert(resp.data.msg)
            }
        });
    }
}

export default Tag