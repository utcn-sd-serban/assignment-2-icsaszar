import Tag from "../objects/Tag";
import {Command, UndoableCommand} from "../command/types";
import {AppState} from "../Model";

export const CREATE_NEW_TAG = "[TAG] CREATE NEW TAG";
export const DELETE_TAG = "[TAG] DELETE TAG";
export const EDIT_NEW_TAG_NAME = "[TAG] EDIT NEW TAG NAME";
export const REQUEST_TAGS = "[TAG] REQUEST TAGS";
export const RECEIVE_TAGS = "[TAG] RECEIVE TAGS";

export interface TagState {
    tags: Tag[];
    newTagName: string;
    isFetching: boolean;
    lastFetched: Date;
}

export interface RequestTagsAction extends Command{
    type: typeof REQUEST_TAGS;
}

export interface ReceiveTagsAction extends Command{
    type: typeof RECEIVE_TAGS;
    data: Tag[];
}

export class CreateNewTagAction implements UndoableCommand{
    readonly type: typeof CREATE_NEW_TAG = CREATE_NEW_TAG;


    readonly name: string;
    readonly id: number;

    makeAntiAction(state: AppState): DeleteTagAction{
        return new DeleteTagAction(this.id);
    }

    constructor(newTagName: string, id: number){
        this.name = newTagName;
        this.id = id
    }
}

export class DeleteTagAction implements UndoableCommand{
    readonly type: typeof DELETE_TAG = DELETE_TAG;

    readonly id: number = 0;

    makeAntiAction(state: AppState, ...args: any[]): CreateNewTagAction{
        let tag = state.tagState.tags.find(t => t.id === this.id) as Tag;
        return new CreateNewTagAction(tag.name, tag.id)
    };


    constructor(id: number) {
        this.id = id;
    }
}

export interface EditNewTagNameAction extends Command{
    type: typeof EDIT_NEW_TAG_NAME;
    newName: string
}

export type TagAction = CreateNewTagAction
                      | EditNewTagNameAction
                      | DeleteTagAction
                      | RequestTagsAction
                      | ReceiveTagsAction;