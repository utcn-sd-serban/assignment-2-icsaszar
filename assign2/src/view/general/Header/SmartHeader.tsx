
import User from "../../../model/objects/User";
import * as React from "react";
import {connect} from "react-redux";
import {AppState} from "../../../model/Model";
import {Header} from "./Header";

type Props = { currentUser?: User }

class SmartHeader extends React.Component<Props>{
    render(){
        return (
            this.props.currentUser &&
            <Header currentUser={this.props.currentUser.id.toString()}/>
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        currentUser: state.userState.currentUser
    };
}

export default connect(mapStateToProps)(SmartHeader);