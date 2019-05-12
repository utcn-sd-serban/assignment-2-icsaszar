import {AppState} from "../../../model/Model";
import {getQuestionAndAnswersWithVotes} from "../../../model/question/selectors";
import Question from "../../../model/objects/Question";
import React from "react";
import {PostDetailsView} from "./PostDetailsView";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {postDetailsPresenter} from "../../../presesnter/PostDetailsPresenter";
import {VoteDirection} from "../../../model/objects/Vote";

interface Props {
    currentQuestion?: Question;
    currentQuestionId: string;
    onVote: (postId: number, postAuthorId: number) => (direction: VoteDirection) => void;
}

class SmartPostDetailsView extends React.Component<Props> {
    render() {
        return (
            this.props.currentQuestion &&
            <div>
                <PostDetailsView question={this.props.currentQuestion} onVote={this.props.onVote}/>
            </div>
        );
    }
}


function mapStateToProps(state: AppState, props: { currentQuestionId: string }) {
    const id = props.currentQuestionId;
    return {
        currentQuestion: getQuestionAndAnswersWithVotes(state, id)
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    const presenter = postDetailsPresenter(dispatch);
    return {
        onVote: (postId: number, postAuthorId: number) => (direction: VoteDirection) =>
            presenter.handleVoteOnPost(postId, postAuthorId, direction)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SmartPostDetailsView);