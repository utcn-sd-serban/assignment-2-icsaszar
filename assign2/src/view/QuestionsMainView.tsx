import React, {Component} from "react";
import SmartNewPostView from "./NewPost/SmartNewPostView";
import SmartQuestionListView from "./QuestionList/SmartQuestionListView";


//Will be used to refactor the QuestionsList, NewPost and Filter components
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

