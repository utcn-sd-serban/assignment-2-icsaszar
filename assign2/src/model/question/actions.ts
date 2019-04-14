import User from "../objects/User";
import {NEW_POST, QuestionActions} from "./types";


export function doNewPost(title: string, text: string, author: User): QuestionActions{
    return {
        type: NEW_POST,
        newPost: { title: title, text: text, author: author }
    };
}

