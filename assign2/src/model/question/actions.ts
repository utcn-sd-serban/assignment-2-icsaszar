import User from "../objects/User";
import {NEW_POST, QuestionActions} from "./types";
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

