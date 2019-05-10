import {combineReducers, createStore} from "redux";
import {questionReducer} from "./question/reducers";
import {userReducer} from "./user/reducers";
import {filterReducer} from "./filter/reducers";
import {tagReducer} from "./tag/reducers";

const rootReducer = combineReducers({
    questionState: questionReducer,
    userState: userReducer,
    filterState: filterReducer,
    tagState: tagReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);