import {
    ADD_TAG_TO_SELECTED_TAGS,
    CLEAR_NEW_POST_DATA,
    SET_CURRENT_TAG,
    SET_NEW_POST_FIELD,
    SetCurrentTagAction,
    SetNewPostFieldAction,
    NewPostState, NewPostActions
} from "./types";
import * as Data from '../../SeedData'

const initialState: NewPostState = {
    currentTag: Data.tags[0],
    newText: "",
    newTitle: "",
    selectedTags: [],
    newAnswerText: ""
};

//Splitting this would be nice...
export function newPostReducer(state: NewPostState = initialState, action: NewPostActions): NewPostState{
    switch (action.type){
        case SET_CURRENT_TAG:
            return setCurrentTag(state, action);
        case ADD_TAG_TO_SELECTED_TAGS:
            return addTagToSelectedTags(state);
        case CLEAR_NEW_POST_DATA:
            return clearNewPostData(state);
        case SET_NEW_POST_FIELD:
            return setNewPostField(state, action);
        default:
            return state;
    }
}

function setCurrentTag(state: NewPostState, action: SetCurrentTagAction): NewPostState {
    return {
        ...state,
        currentTag: action.currentTag
    };
}

function addTagToSelectedTags(state: NewPostState): NewPostState {
    return {
        ...state,
        selectedTags: state.selectedTags.includes(state.currentTag) ? state.selectedTags : [...state.selectedTags, state.currentTag]
    };
}

function clearNewPostData(state: NewPostState): NewPostState {
    return {
        ...initialState
    };
}

function setNewPostField(state: NewPostState, action: SetNewPostFieldAction): NewPostState {
    switch (action.field) {
        case "title":
            return {
                ...state,
                newTitle: action.value
            };
        case "text":
            return {
                ...state,
                newText: action.value
            };
        case "answer":
            return {
                ...state,
                newAnswerText: action.value
            };
        default:
            return state;
    }
}

