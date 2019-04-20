import React, {Component} from "react";
import SmartQuestionListView from "../QuestionList/SmartQuestionListView";
import SmartFilterView from "../Filter/SmartFilterView";


//Will be used to refactor the QuestionsList, NewPost and Filter components
export default class QuestionsMainView extends Component{
    render(){
        return (
            <div className={"container"}>
                <SmartFilterView/>
                <SmartQuestionListView/>
            </div>
        )
    }
}

