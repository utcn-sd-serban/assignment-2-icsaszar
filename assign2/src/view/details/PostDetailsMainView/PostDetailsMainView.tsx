import React from "react";
import SmartPostDetailsView from "../PostDetails/SmartPostDetailsView";
import SmartNewAnswerView from "../NewAnswer/SmartNewAnswerView";
import {RouteComponentProps} from "react-router";

export default class PostDetailsMainView extends React.Component<RouteComponentProps<{id: string}>> {
    render(){
        const {match} = this.props;
        return (
            <div className={"container"}>
                <SmartPostDetailsView currentQuestionId={match.params.id}/>
                <SmartNewAnswerView currentQuestionId={match.params.id}/>
            </div>
        )
    }
}