import User from "../objects/User";
import Tag from "../objects/Tag";
import Question from "../objects/Question";
import {FILTER_BY_TAG, NEW_POST, QuestionActions, QuestionsState, SEARCH_BY_TITLE} from "./types";




export function doNewPost(title: string, text: string, author: User): QuestionActions{
    return {
        type: NEW_POST,
        newPost: { title: title, text: text, author: author }
    };
}

export function doFilterByTag(tag: Tag): QuestionActions{
    return {
        type: FILTER_BY_TAG,
        tag
    };
}

export function doSearchByTitle(searchedText: string): QuestionActions{
    return {
        type: SEARCH_BY_TITLE,
        searchedText
    }
}

