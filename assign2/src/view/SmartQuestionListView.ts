import {QuestionsState} from "../model/question/types";
import {connect} from "react-redux";
import QuestionListView from "./QuestionListVIew";
import {AppState} from "../model/Model";


function mapStateToProps(state: AppState) {
    return {
        questions: state.questionState.questions
    }
}

export default connect(mapStateToProps)(QuestionListView);