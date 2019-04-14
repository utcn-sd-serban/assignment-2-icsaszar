import {Component} from "react";
import User from "../model/objects/User";
import Question from "../model/objects/Question";
import {AppState} from "../model/Model";
import Tag from "../model/objects/Tag";

interface Props {
    currentUser: User;
    questions: Question[];
    currentTag: Tag;
    searchedText: string;
}

export default class SmartQuestionsMainView extends Component<Props>{

}

function mapStateToProps(state: AppState){
    return {
        currentUser: state.userState.currentUser,
        questions: state.questionState.questions
    }
}