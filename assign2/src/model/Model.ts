import {applyMiddleware, combineReducers, compose, createStore, Dispatch, Middleware, MiddlewareAPI} from "redux";
import {questionReducer} from "./question/reducers";
import {userReducer} from "./user/reducers";
import {filterReducer} from "./filter/reducers";
import {tagReducer} from "./tag/reducers";
import thunkMiddleware, {ThunkMiddleware} from "redux-thunk"
import {commandReducer} from "./command/reducers";
import {Command} from "./command/types";
import {commandMiddleware} from "./command/middleware";

const rootReducer = combineReducers({
    questionState: questionReducer,
    userState: userReducer,
    filterState: filterReducer,
    tagState: tagReducer,
    commandState: commandReducer
});

export type AppState = ReturnType<typeof rootReducer>;

//Redux doesn't accept class instances for actions
const classToObjectMiddleware: Middleware =
        api => (next: Dispatch) => (action: Command) => {
            return next({...action})
};
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer,
    composeEnhancers(
        applyMiddleware(
            commandMiddleware,
            thunkMiddleware as ThunkMiddleware<AppState, Command>,
            classToObjectMiddleware)));