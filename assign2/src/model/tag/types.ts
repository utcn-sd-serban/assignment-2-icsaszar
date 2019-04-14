import Tag from "../objects/Tag";

export const NEW_TAG = "NEW_TAG";

export interface TagState {
    tags: Tag[];
}

interface NewTagAction {
    type: typeof NEW_TAG,
    tagName: string
}

export type TagAction = NewTagAction;