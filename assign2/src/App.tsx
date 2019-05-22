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

interface Props {
    fetchPosts: () => void;
    fetchTags: () => void;
    fetchUserDetails: () => void;
}

class App extends Component<Props>{
    render() {

        WebSocketClient.initialize("User2", "dhas9d8hdq2de", store.dispatch);
        RestClient.initialize("User2", "dhas9d8hdq2de");

        return (
            <HashRouter>
                <SmartHeader/>
                <Switch>
                    <Route exact={true} component={QuestionsMainView} path={"/"}/>
                    <Route exact={true} component={SmartNewPostView} path={"/submit"}/>
                    <Route exact={true} component={PostDetailsMainView} path={"/posts/:id"}/>
                    <Route exact={true} component={SmartUserAccountView} path={"/users/:id"}/>
                </Switch>
            </HashRouter>
        );
    }

    componentDidMount(): void {
        this.props.fetchUserDetails();
        this.props.fetchPosts();
        this.props.fetchTags();
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, undefined, Command>) {
    let presenter = appPresenter(dispatch);
    return {
        fetchPosts: () =>
            presenter.handleFetchPosts(),
        fetchTags: () =>
            presenter.handleFetchTags(),
        fetchUserDetails: () =>
            presenter.handleFetchUserDetails()
    }
}

export default connect(undefined, mapDispatchToProps)(App)