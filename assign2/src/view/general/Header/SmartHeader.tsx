
import User from "../../../model/objects/User";
import * as React from "react";
import {connect} from "react-redux";
import {AppState} from "../../../model/Model";
import {Header} from "./Header";
import {Dispatch} from "redux";
import {headerPresenter} from "../../../presesnter/HeaderPresenter";

interface Props{
    currentUser?: User;
    onUndo: () => void;
    onRedo: () => void;
}

class SmartHeader extends React.Component<Props>{
    render(){
        return (
            this.props.currentUser &&
            <Header
                currentUser={this.props.currentUser.id.toString()}
                onUndo={this.props.onUndo}
                onRedo={this.props.onRedo}
            />
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        currentUser: state.userState.currentUser
    };
}

function mapDispatchToProps(dispatch: Dispatch): Pick<Props, 'onUndo' | 'onRedo'> {
    let presenter = headerPresenter(dispatch);
    return {
        onUndo: () => presenter.handleUndo(),
        onRedo: () => presenter.handleRedo()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartHeader);