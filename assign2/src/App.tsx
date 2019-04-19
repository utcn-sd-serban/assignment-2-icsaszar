import React, { Component } from 'react';
import './App.css';
import {Header} from "./view/Header";
import SmartNewPostView from "./view/NewPost/SmartNewPostView";
import QuestionsMainView from "./view/QuestionsMainView";
import {HashRouter, Route, Switch} from "react-router-dom";
import SmartPostDetailsView from "./view/PostDetails/SmartPostDetailsView";

class App extends Component {
  render() {
    return (
        <HashRouter>
            <Header/>
            <Switch>
                <Route exact={true} component={QuestionsMainView} path={"/"}/>
                <Route exact={true} component={SmartNewPostView} path={"/submit"}/>
                <Route exact={true} component={SmartPostDetailsView} path={"/posts/:id"}/>
            </Switch>
        </HashRouter>
    );
  }
}

export default App;
