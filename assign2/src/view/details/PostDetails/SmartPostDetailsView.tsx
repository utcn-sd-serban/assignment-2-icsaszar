import {AppState} from "../../../model/Model";
import {getCurrentQuestion} from "../../../model/question/selectors";
import Question from "../../../model/objects/Question";
import React from "react";
import {PostDetailsView} from "./PostDetailsView";
import {connect} from "react-redux";
import {QuestionView} from "../../general/reuseable/QuestionView";
import {AnswerView} from "../../general/reuseable/AnswerView";

interface Props {
    currentQuestion?: Question;
    currentQuestionId: string;
}

class SmartPostDetailsView extends React.Component<Props> {
    render() {
        return (
            this.props.currentQuestion &&
            <div>
                <QuestionView question={this.props.currentQuestion} titleIsLink={false}/>
                {
                    this.props.currentQuestion.answers.map(answer =>
                        <AnswerView key={answer.id} answer={answer}/>
                    )
                }
                {/*<PostDetailsView question={this.props.currentQuestion}/>*/}
            </div>
        );
    }
}


function mapStateToProps(state: AppState, props: { currentQuestionId: string }) {
    //FIXME Where should id be validated? We receive a string but it must be a number
    const id = props.currentQuestionId;
    return {
        currentQuestion: getCurrentQuestion(state, id)
    }
}

export default connect(mapStateToProps)(SmartPostDetailsView);