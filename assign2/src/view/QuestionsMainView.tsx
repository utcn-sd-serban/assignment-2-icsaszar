import React, {Component} from "react";
import SmartNewPostView from "./SmartNewPostView";
import SmartQuestionListView from "./SmartQuestionListView";

export default class QuestionsMainView extends Component{
    render(){
        return (
            <div>
                <SmartNewPostView />
                <SmartQuestionListView/>
            </div>
        )
    }
}

