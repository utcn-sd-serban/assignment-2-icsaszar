import Question from '../model/objects/Question'
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


function QuestionView({question}: {question: Question}) {
    const {title, text, author, posted} = question;
    return (
            <Container>
                <Row>
                    <Col> {title} </Col>
                </Row>
                <Row>
                    <Col> {text} </Col>
                </Row>
                <Row>
                    <Col> {author.name} </Col>
                    <Col> {posted.toDateString()} </Col>
                </Row>
            </Container>
    )
}

export default function QuestionListView({questions}: {questions: Question[]}) {
    return (
        <Container>
            {
                questions.map(question =>
                <QuestionView question={question} key={question.id}/>)
            }
        </Container>
    );
}