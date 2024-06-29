import TagInterface from "../interfaces/TagInterface.ts";
import {tagListGet,tagSave} from "../../api/TagApi.ts";

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

    public async saveTag(data:any): Promise<void> {
        await tagSave({
            tagContent: data.tagContent,
        }).then(resp => {
            if (resp.data.result == 1) {

            } else {
                alert(resp.data.msg)
            }
        });
    }
}

export default Tag