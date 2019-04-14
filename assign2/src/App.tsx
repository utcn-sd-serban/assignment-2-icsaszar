import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {store} from "./model/Model";
import QuestionListView from "./view/QuestionListVIew";

class App extends Component {
  render() {
    return (
        <QuestionListView state={store.getState().questionState}/>
    );
  }
}

export default App;
