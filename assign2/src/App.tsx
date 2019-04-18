import React, { Component } from 'react';
import './App.css';
import {Header} from "./view/Header";
import SmartNewPostView from "./view/NewPost/SmartNewPostView";
import SmartQuestionListView from "./view/QuestionList/SmartQuestionListView";
import SmartFilterView from "./view/Filter/SmartFilterView";
import QuestionsMainView from "./view/QuestionsMainView";
import {HashRouter, Route, Switch} from "react-router-dom";

class App extends Component {
  render() {
    return (
        <HashRouter>
            <Header/>
            <Switch>
                <Route exact={true} component={QuestionsMainView} path={"/"}/>
                <Route exact={true} component={SmartNewPostView} path={"/submit"}/>
            </Switch>
        </HashRouter>
    );
  }
}

export default App;
