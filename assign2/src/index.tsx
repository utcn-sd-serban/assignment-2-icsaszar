import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import QuestionListView from './view/QuestionListVIew';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {store} from "./model/Model";

ReactDOM.render(<QuestionListView state={store.getState().questionState}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
