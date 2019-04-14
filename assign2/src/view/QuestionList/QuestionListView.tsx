import Question from '../../model/objects/Question'
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Container from 'react-bootstrap/Container';


function QuestionView({question}: {question: Question}) {
    const {title, text, author, posted, tags} = question;
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
                <Row>
                    <Col>
                    {
                        <ButtonToolbar>
                            {
                                tags.map(tag =>
                                    <Button variant={"outline-dark"} size={"sm"} > {tag.name} </Button>
                                )
                            }
                        </ButtonToolbar>
                    }
                    </Col>
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