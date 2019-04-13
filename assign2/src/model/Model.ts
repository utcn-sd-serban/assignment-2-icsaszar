import User from "./User";
import Question from "./Question";
import Answer from "./Answer";
import Tag from "./Tag";
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