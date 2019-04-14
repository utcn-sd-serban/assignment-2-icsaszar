import React, {Component} from "react";
import User from "../model/objects/User";
import Question from "../model/objects/Question";

interface Props {
    currentUser: User;
    questions: Question[];
}

export default class SmartQuestionsMainView extends Component<Props>{

}

