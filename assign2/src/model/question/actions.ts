import User from "../objects/User";
import {NEW_POST, QuestionActions, SET_NEW_POST_TEXT, SET_NEW_POST_TITLE} from "./types";
import Tag from "../objects/Tag";


export function doNewPost(title: string, text: string, author: User, tags: Tag[] = []): QuestionActions{
    return {
        type: NEW_POST,
        newPost: {
            title: title,
            text: text,
            author: author,
            tags: tags
        }
    };
}

export function doSetNewTitle(newTitle: string): QuestionActions{
    return {
        type: SET_NEW_POST_TITLE,
        newTitle: newTitle
    };
}

export function doSetNewText(newText: string): QuestionActions{
    return {
        type: SET_NEW_POST_TEXT,
        newText: newText
    };
}