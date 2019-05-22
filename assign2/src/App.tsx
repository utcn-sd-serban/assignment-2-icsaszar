import React, {Component} from 'react';
import './App.css';
import SmartNewPostView from "./view/new-post/NewPost/SmartNewPostView";
import QuestionsMainView from "./view/post-list/MainView/QuestionsMainView";
import {HashRouter, Route, Switch} from "react-router-dom";
import PostDetailsMainView from "./view/details/PostDetailsMainView/PostDetailsMainView";
import SmartHeader from "./view/general/Header/SmartHeader";
import SmartUserAccountView from "./view/account/UserAccount/SmartUserAccountView";
import {WebSocketClient} from "./ws/WebSocketClient";
import {AppState, store} from "./model/Model";
import {ThunkDispatch} from "redux-thunk";
import {Command} from "./model/command/types";
import {appPresenter} from "./presesnter/AppPresenter";
import {connect} from "react-redux";
import RestClient from "./rest/RestClient";
import SmartLoginView from "./view/login/SmartLoginView";
import User from "./model/objects/User";

interface Props {
    currentUser?: User
}

class App extends Component<Props>{
    render() {

        WebSocketClient.initialize("User2", "dhas9d8hdq2de", store.dispatch);
        RestClient.initialize("User2", "dhas9d8hdq2de");

        return (
            <HashRouter>
                {this.props.currentUser &&  <SmartHeader/> }
                <Switch>
                    <Route exact={true} component={SmartLoginView} path={"/"}/>
                    <Route exact={true} component={QuestionsMainView} path={"/posts"}/>
                    <Route exact={true} component={SmartNewPostView} path={"/submit"}/>
                    <Route exact={true} component={PostDetailsMainView} path={"/posts/:id"}/>
                    <Route exact={true} component={SmartUserAccountView} path={"/users/:id"}/>
                </Switch>
            </HashRouter>
        );
    }
}

function mapStateToProps(state: AppState): Props{
    return {
        currentUser: state.userState.currentUser
    }
}

export default connect(mapStateToProps)(App);