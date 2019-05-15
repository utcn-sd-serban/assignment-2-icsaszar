import {ThunkAction} from "redux-thunk";
import {AppState} from "../../Model";
import {Command} from "../../command/types";
import RestClient, {ResponseData} from "../../../rest/RestClient";
import Question, {QuestionDTO} from "../../objects/Question";
import {doAddAnswer, doNewPost, doReceivePosts, doRequestPosts} from "./actions";
import Answer, {AnswerDTO} from "../../objects/Answer";
import {isStale} from "../../utility";

type ThunkResult<R> = ThunkAction<R, AppState, undefined, Command>;

export function fetchPosts(): ThunkResult<Promise<void>>{
    return async (dispatch, getState) => {
        let {userState: {currentUser}, questionState: {postListState}} = getState();
        if(currentUser){
            if(isStale(postListState.lastFetched)){
                dispatch(doRequestPosts());
                let restClient = new RestClient(currentUser.name, currentUser.password);
                try {
                    let response = await restClient.loadPosts();
                    if (response.status === 'succeeded'){
                        let data = await response.data.json();
                        dispatch(doReceivePosts(data));
                    }
                }catch (err) {
                    console.log(err)
                }
            }
        }
    }
}

export function sendNewPost(): ThunkResult<Promise<void>> {
    return async (dispatch, getState) => {
        let {userState: {currentUser}} = getState();
        if(currentUser){
            let restClient = new RestClient(currentUser.name, currentUser.password);
            let {newText, newTitle, selectedTags} = getState().questionState.newPostState;
            let qDTO: QuestionDTO = {
                author: currentUser,
                tags: selectedTags,
                text: newText,
                title: newTitle
            };
            try{
                let response = await restClient.sendNewPost(qDTO);
                if (response.status === 'succeeded'){
                    let data: Question = await response.data.json();
                    dispatch(doNewPost({
                        ...data,
                        posted: new Date(data.posted)
                    }));
                }
            }catch (err) {
                console.log(err)
            }
        }
    }
}

export function sendAnswer(postId: number): ThunkResult<Promise<void>> {
    return async (dispatch, getState) => {
        let {userState: {currentUser}} = getState();
        if(currentUser){
            let restClient = new RestClient(currentUser.name, currentUser.password);
            let {newAnswerText} = getState().questionState.newPostState;
            let ansDTO: AnswerDTO = {
                postId: postId,
                text: newAnswerText
            };
            try{
                let response = await restClient.sendNewAnswer(ansDTO);
                if (response.status === 'succeeded'){
                    let data: Answer = await response.data.json();
                    dispatch(doAddAnswer(Answer.fromObject({
                        ...data,
                        posted: new Date(data.posted)
                    }), postId));
                }
            }catch (err) {
                console.log(err)
            }
        }
    }
}