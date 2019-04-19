import {AppState} from "../../model/Model";
import {getCurrentQuestion} from "../../model/question/selectors";
import Question from "../../model/objects/Question";
import React, {Component} from "react";
import {PostDetailsView} from "./PostDetailsView";
import {connect} from "react-redux";


interface Props {
    currentFilter: string
    currentQuestion?: Question
}

class SmartPostDetailsView extends React.Component<Props>{
    render(){
        return(
            this.props.currentQuestion &&
            <PostDetailsView question={this.props.currentQuestion}/>
        );
    }
}


function mapStateToProps(state: AppState, props: Props){
    return {
        currentQuestion: getCurrentQuestion(state, props.currentFilter)
    }
}

export default connect(mapStateToProps)(SmartPostDetailsView);