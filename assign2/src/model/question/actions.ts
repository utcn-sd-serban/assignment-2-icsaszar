import User from "../User";
import Tag from "../Tag";
import Question from "../Question";
import {FILTER_BY_TAG, NEW_POST, QuestionActions, QuestionsState, SEARCH_BY_TITLE} from "./types";




function doNewPost(title: string, text: string, author: User){
    return {
        type: NEW_POST,
        newPost: { title: title, text: text, author: author }
    };
}

function doFilterByTag(tag: Tag){
    return {
        type: FILTER_BY_TAG,
        tag
    };
}

function doSearchByTitle(searchedText: string){
    return {
        type: SEARCH_BY_TITLE,
        searchedText
    }
}

