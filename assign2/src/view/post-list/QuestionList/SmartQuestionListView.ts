import {connect} from "react-redux";
import QuestionListView from "./QuestionListView";
import {AppState} from "../../../model/Model";
import {getFilteredQuestions} from "../../../model/question/selectors";


function mapStateToProps(state: AppState) {
    return {
        questions: getFilteredQuestions(state)
    }
}

export default connect(mapStateToProps)(QuestionListView);