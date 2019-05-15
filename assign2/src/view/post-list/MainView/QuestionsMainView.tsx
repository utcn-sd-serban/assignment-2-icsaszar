import React, {Component, FunctionComponent} from "react";
import SmartQuestionListView from "../QuestionList/SmartQuestionListView";
import SmartFilterView from "../Filter/SmartFilterView";


const QuestionsMainView: FunctionComponent =
    () => {
        return (
            <div className={"container"}>
                <SmartFilterView/>
                <SmartQuestionListView/>
            </div>
        )
};

export default QuestionsMainView
