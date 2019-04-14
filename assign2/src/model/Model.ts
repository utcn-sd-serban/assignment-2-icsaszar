import {combineReducers, createStore} from "redux";
import {questionReducer} from "./question/reducers";
import {userReducer} from "./user/reducers";
import {filterReducer} from "./filter/reducers";

const rootReducer = combineReducers({
    questionState: questionReducer,
    userState: userReducer,
    filterState: filterReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

function mapStateToProps(state: AppState){
    return {
        questionState: state.questionState,
        userState: state.userState
    }
}