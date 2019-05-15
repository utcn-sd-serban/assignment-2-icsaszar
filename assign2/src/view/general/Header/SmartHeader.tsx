
import User from "../../../model/objects/User";
import * as React from "react";
import {connect} from "react-redux";
import {AppState} from "../../../model/Model";
import {Header} from "./Header";
import {Dispatch} from "redux";
import {headerPresenter} from "../../../presesnter/HeaderPresenter";
import {existsRedoCommand, existsUndoCommand} from "../../../model/command/selectors";

interface Props{
    currentUser?: User;
    undoPossible: boolean;
    redoPossible: boolean;
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
                undoPossible={this.props.undoPossible}
                redoPossible={this.props.redoPossible}
            />
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        currentUser: state.userState.currentUser,
        undoPossible: existsUndoCommand(state),
        redoPossible: existsRedoCommand(state)
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