import React, { Component } from 'react';
import './App.css';
import {Header} from "./view/Header";
import SmartNewPostView from "./view/NewPost/SmartNewPostView";
import SmartQuestionListView from "./view/QuestionList/SmartQuestionListView";
import SmartFilterView from "./view/Filter/SmartFilterView";

class App extends Component {
  render() {
    return (
        <div>
          <Header/>
          <SmartFilterView/>
          <SmartNewPostView/>
          <SmartQuestionListView/>
        </div>
    );
  }
}

export default App;
