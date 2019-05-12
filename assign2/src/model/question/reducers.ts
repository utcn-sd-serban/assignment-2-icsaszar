import {
    ADD_ANSWER_TO_QUESTION,
    ADD_TAG_TO_SELECTED_TAGS,
    CLEAR_NEW_POST_DATA,
    DELETE_ANSWER,
    DELETE_QUESTION,
    EDIT_ANSWER,
    EDIT_QUESTION,
    NEW_POST,
    QuestionActions,
    QuestionsState,
    SET_CURRENT_TAG,
    SET_NEW_POST_FIELD,
    SAVE_UPDATED_ANSWER,
    SAVE_UPDATED_QUESTION,
    UpdateAnswerAction,
    UpdateQuestionAction,
    EditQuestionAction,
    EditAnswerAction,
    DeleteQuestionAction,
    DeleteAnswerAction,
    AddTagToSelectedTagsAction, SetCurrentTagAction, SetNewPostFieldAction, NewPostAction, AddAnswerAction
} from "./types";
import Question from "../objects/Question";
import * as Data from '../SeedData'
import Answer from "../objects/Answer";

const initialState: QuestionsState = {
    questions: Data.questions,
    newText: "",
    newTitle: "",
    newAnswer: "",
    currentTag: Data.tags[0],
    selectedTags: []
};

export function questionReducer(state: QuestionsState = initialState, action: QuestionActions): QuestionsState{
    switch (action.type){
        case SAVE_UPDATED_ANSWER:
            return saveUpdatedAnswer(state, action);
        case SAVE_UPDATED_QUESTION:
            return saveUpdatedQuestions(state, action);
        case EDIT_QUESTION:
            return editQuestion(state, action);
        case EDIT_ANSWER:
            return editAnswer(state, action);
        case DELETE_QUESTION:
            return deleteQuestion(state, action);
        case DELETE_ANSWER:
            return deleteAnswer(state, action);
        case SET_CURRENT_TAG:
            return setCurrentTag(state, action);
        case ADD_TAG_TO_SELECTED_TAGS:
            return addTagToSelectedTags(state);
        case CLEAR_NEW_POST_DATA:
            return clearNewPostData(state);
        case SET_NEW_POST_FIELD:
            return setNewPostField(state, action);
        case NEW_POST:
            return createNewPost(state, action);
        case ADD_ANSWER_TO_QUESTION:
            return addAnswer(state, action);
        default:
            return state;
    }
}

function saveUpdatedAnswer(state: QuestionsState, action: UpdateAnswerAction) {
    return {
        ...state,
        questions: state.questions.map(q =>
            Question.clone(
                {
                    ...q,
                    answers: q.answers.map(a =>
                        (a.id === action.answerId) ? Answer.clone({...a, text: a.tempText}) : a
                    )
                }
            ))
    };
}

function saveUpdatedQuestions(state: QuestionsState, action: UpdateQuestionAction) {
    return {
        ...state,
        questions: state.questions.map(q =>
            q.id === action.questionId ? Question.clone({...q, text: q.tempText}) : q
        )
    };
}

function editQuestion(state: QuestionsState, action: EditQuestionAction) {
    return {
        ...state,
        questions: state.questions.map(q =>
            q.id === action.questionId ? Question.clone({...q, tempText: action.newText}) : q
        )
    };
}

function editAnswer(state: QuestionsState, action: EditAnswerAction) {
    return {
        ...state,
        questions: state.questions.map(q =>
            Question.clone({
                ...q,
                answers: q.answers.map(a =>
                    a.id === action.answerId ? Answer.clone({...a, tempText: action.newText}) : a
                )
            })
        )
    };
}

function deleteQuestion(state: QuestionsState, action: DeleteQuestionAction) {
    return {
        ...state,
        questions: state.questions.filter(q => q.id !== action.questionId)
    };
}

function deleteAnswer(state: QuestionsState, action: DeleteAnswerAction) {
    return {
        ...state,
        questions: state.questions.map(q =>
            Question.clone({
                ...q,
                answers: q.answers.filter(a => a.id !== action.answerId)
            })
        )
    };
}

function setCurrentTag(state: QuestionsState, action: SetCurrentTagAction) {
    return {
        ...state,
        currentTag: action.currentTag
    };
}

function addTagToSelectedTags(state: QuestionsState) {
    return {
        ...state,
        //TODO better validation
        selectedTags: state.selectedTags.includes(state.currentTag) ? state.selectedTags : [...state.selectedTags, state.currentTag]
    };
}

function clearNewPostData(state: QuestionsState) {
    return {
        ...initialState,
        questions: state.questions
    };
}

function setNewPostField(state: QuestionsState, action: SetNewPostFieldAction) {
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
                newAnswer: action.value
            };
        default:
            return state;
    }
}

function createNewPost(state: QuestionsState, action: NewPostAction){
    return {
        ...state,
        questions:
            [
                ...state.questions,
                new Question(
                    state.newTitle,
                    state.newText,
                    action.postAuthor,
                    state.selectedTags
                )
            ]
    };
}

function addAnswer(state: QuestionsState, action: AddAnswerAction){
    const newAnswer = new Answer(state.newAnswer, action.answerAuthor);
    return {
        ...state,
        questions: state.questions.map(
            q => {
                if(q.id === action.targetQuestionId)
                    return Question.clone({...q, answers: [...q.answers, newAnswer]});
                else
                    return q;
                }
            )
    };
}

