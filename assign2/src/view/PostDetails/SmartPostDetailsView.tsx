import {AppState} from "../../model/Model";
import {getCurrentQuestion} from "../../model/question/selectors";
import Question from "../../model/objects/Question";
import React, {Component} from "react";
import {PostDetailsView} from "./PostDetailsView";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";

type Props = {currentQuestion?: Question} & RouteComponentProps<{id: string}>

class SmartPostDetailsView extends React.Component<Props>{
    render(){
        return(
            this.props.currentQuestion &&
            <PostDetailsView question={this.props.currentQuestion}/>
        );
    }
}


function mapStateToProps(state: AppState, props: Props){
    const id = props.match.params.id;
    console.log(id);
    return {
        currentQuestion: getCurrentQuestion(state, id)
    }
}

export default connect(mapStateToProps)(SmartPostDetailsView);