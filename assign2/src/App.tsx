import React, {Component} from 'react';
import './App.css';
import SmartNewPostView from "./view/new-post/NewPost/SmartNewPostView";
import QuestionsMainView from "./view/post-list/MainView/QuestionsMainView";
import {HashRouter, Route, Switch} from "react-router-dom";
import PostDetailsMainView from "./view/details/PostDetailsMainView/PostDetailsMainView";
import SmartHeader from "./view/general/Header/SmartHeader";
import SmartUserAccountView from "./view/account/UserAccount/SmartUserAccountView";

export default class App extends Component{
    //TODO move fetch here
    render() {
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
}
