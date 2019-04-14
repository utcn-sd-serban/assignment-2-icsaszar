import React, { Component } from 'react';
import './App.css';
import {Header} from "./view/Header";
import SmartNewPostView from "./view/SmartNewPostView";
import SmartQuestionListView from "./view/SmartQuestionListView";

class App extends Component {
  render() {
    return (
        <div>
          <Header/>
          <hr/>
          <SmartNewPostView/>
          <SmartQuestionListView/>
        </div>
    );
  }
}

export default App;
