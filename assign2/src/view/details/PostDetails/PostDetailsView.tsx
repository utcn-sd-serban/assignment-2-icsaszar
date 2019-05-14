import React from 'react';
import Question from "../../../model/objects/Question";
import TagListView from "../../general/reuseable/TagListView";
import {AnswerView} from "../../general/reuseable/AnswerView";
import {QuestionView} from "../../general/reuseable/QuestionView";
import {VotePane} from "../../general/reuseable/VotePane";
import {VoteDirection} from "../../../model/objects/Vote";
import {QuestionWithVotes} from "../../../model/question/postlist/selectors";

interface Props {
    question: QuestionWithVotes;
    onVote: (postId: number, postAuthorId: number) => (direction: VoteDirection) => void
}


export function PostDetailsView({question, onVote}: Props) {
    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-1 ">
                    <VotePane score={question.score} onVote={onVote(question.id, question.author.id)} voted={question.voted}/>
                </div>
                <div className="col">
                    <QuestionView question={question} titleIsLink={false}/>
                </div>
            </div>

            {
                question.answers.map(answer =>
                    <div className="row align-items-center" >
                        <div className="col-1">
                            <VotePane score={answer.score} onVote={onVote(answer.id, answer.author.id)} voted={answer.voted}/>
                        </div>
                        <div className="col">
                            <AnswerView key={answer.id} answer={answer}/>
                        </div>
                    </div>
                )
            }
        </div>
    )
}