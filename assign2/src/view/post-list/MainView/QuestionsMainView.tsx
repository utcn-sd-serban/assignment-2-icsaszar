import React, {Component} from "react";
import SmartQuestionListView from "../QuestionList/SmartQuestionListView";
import SmartFilterView from "../Filter/SmartFilterView";


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

