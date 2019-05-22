import {ThunkAction} from "redux-thunk";
import {AppState} from "../../Model";
import {Command} from "../../command/types";
import RestClient, {ResponseData} from "../../../rest/RestClient";
import Question, {QuestionDTO} from "../../objects/Question";
import {doAddAnswer, doNewPost, doReceivePosts, doRequestPosts, doMergeUpdatedAnswer, doMergeUpdatedQuestion} from "./actions";
import Answer, {AnswerDTO} from "../../objects/Answer";
import {isStale} from "../../utility";

type ThunkResult<R> = ThunkAction<R, AppState, undefined, Command>;

export function fetchPosts(invalidate: boolean = false): ThunkResult<Promise<void>>{
    return async (dispatch, getState) => {
        let {userState: {currentUser}, questionState: {postListState}} = getState();
        if(currentUser){
            if(isStale(postListState.lastFetched) || invalidate){
                dispatch(doRequestPosts());
                try {
                    let response = await RestClient.loadPosts();
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

export function fetchPost(postId: number): ThunkResult<Promise<void>>{
    return async (dispatch, getState) => {
        let {userState: {currentUser}} = getState();
        if(currentUser){
            try {
                let response = await RestClient.loadPost(postId);
                if (response.status === 'succeeded'){
                    let data: Question = await response.data.json();
                    dispatch(doMergeUpdatedQuestion(data));
                }
            }catch (err) {
                console.log(err)
            }
        }
    }
}

export function sendNewPost(): ThunkResult<Promise<void>> {
    return async (dispatch, getState) => {
        let {userState: {currentUser}} = getState();
        if(currentUser){
            let {newText, newTitle, selectedTags} = getState().questionState.newPostState;
            let qDTO: QuestionDTO = {
                author: currentUser,
                tags: selectedTags,
                text: newText,
                title: newTitle
            };
            try{
                let response = await RestClient.sendNewPost(qDTO);
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

export function sendEditedQuestion(questionId: number, newText: string): ThunkResult<Promise<void>> {
    return async (dispatch, getState) => {
        let {userState: {currentUser}} = getState();
        if(currentUser){
            try{
                let response = await RestClient.editQuestion(newText, questionId);
                if (response.status === 'succeeded'){
                    let data: Question = await response.data.json();
                    dispatch(doMergeUpdatedQuestion({
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
            let {newAnswerText} = getState().questionState.newPostState;
            let ansDTO: AnswerDTO = {
                postId: postId,
                text: newAnswerText
            };
            try{
                let response = await RestClient.sendNewAnswer(ansDTO);
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

export function sendEditedAnswer(answerId: number, questionId: number, newText: string): ThunkResult<Promise<void>> {
    return async (dispatch, getState) => {
        let {userState: {currentUser}} = getState();
        if(currentUser){
            try{
                let response = await RestClient.editAnswer(newText, answerId, questionId);
                if (response.status === 'succeeded'){
                    let data: Answer = await response.data.json();
                    dispatch(doMergeUpdatedAnswer(questionId, Answer.fromObject({
                        ...data,
                        posted: new Date(data.posted)
                    })));
                }
            }catch (err) {
                console.log(err)
            }
        }
    }
}