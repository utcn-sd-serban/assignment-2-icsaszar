import {connect} from "react-redux";
import QuestionListView from "./QuestionListView";
import {AppState} from "../../../model/Model";
import {getFilteredQuestions} from "../../../model/question/postlist/selectors";
import {Component, FunctionComponent, PureComponent} from "react";
import Question from "../../../model/objects/Question";
import * as React from "react";


interface Props {

    questions: Question[];
}

class SmartQuestionListView extends Component<Props>{
    render(){
        return (
            <QuestionListView questions={this.props.questions}/>
        )
    }
}

function mapStateToProps(state: AppState) {
    return {
        questions: getFilteredQuestions(state)
    }
}

export default connect(mapStateToProps)(SmartQuestionListView);