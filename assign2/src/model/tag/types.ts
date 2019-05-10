import Tag from "../objects/Tag";

export const CREATE_NEW_TAG = "CREATE_NEW_TAG";
export const EDIT_NEW_TAG_NAME = "EDIT_NEW_TAG_NAME";

export interface TagState {
    tags: Tag[];
    newTagName: string;
}

interface CreateNewTagAction {
    type: typeof CREATE_NEW_TAG
}

interface EditNewTagNameAction {
    type: typeof EDIT_NEW_TAG_NAME;
    newName: string
}

export type TagAction = CreateNewTagAction | EditNewTagNameAction;