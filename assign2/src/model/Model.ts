import User from "./objects/User";
import Question from "./objects/Question";
import Answer from "./objects/Answer";
import Tag from "./objects/Tag";
import {combineReducers, createStore} from "redux";
import {questionReducer} from "./question/reducers";
import {userReducer} from "./user/reducers";

const rootReducer = combineReducers({
    questionState: questionReducer,
    userState: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

const tags: Tag[] = [
    new Tag("java", 1),
    new Tag("javascript",2),
    new Tag("pythonscript", 3),
    new Tag("general", 4)
];

function mapStateToProps(state: AppState){
    return {
        questionState: state.questionState,
        userState: state.userState
    }
}