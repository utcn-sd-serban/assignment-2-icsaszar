import {Client} from "@stomp/stompjs";
import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../model/Model";
import {Command} from "../model/command/types";
import Question from "../model/objects/Question";
import {doAddAnswer, doNewPost} from "../model/question/postlist/actions";
import {Vote} from "../model/objects/Vote";
import {doAddVote} from "../model/user/actions";
import {fetchPosts} from "../model/question/postlist/asyncActions";
import Answer from "../model/objects/Answer";
import {dispatchIgnoredAction} from "../model/command/actions";

const NEW_QUESTION_EVENT = "NEW_QUESTION";
const NEW_VOTE_EVENT = "NEW_VOTE";
const NEW_ANSWER_EVENT = "NEW_ANSWER";

interface NewQuestionEvent {
    type: typeof NEW_QUESTION_EVENT;
    payload: Question
}

interface NewVoteEvent {
    type: typeof NEW_VOTE_EVENT
    payload: Vote
}

interface NewAnswerEvent {
    type: typeof NEW_ANSWER_EVENT
    payload: {
        questionId: number,
        answer: Answer
    }
}

type Event = NewQuestionEvent | NewVoteEvent | NewAnswerEvent

export class WebSocketClient{
    private readonly client: Client;
    private readonly dispatch: ThunkDispatch<AppState, undefined, Command>;
    private static wsClient?: WebSocketClient = undefined;

    static initialize(username: string, password: string, dispatch: ThunkDispatch<AppState, undefined, Command>){
        if(this.wsClient !== undefined){
            this.wsClient.client.deactivate();
            delete this.wsClient;
            this.wsClient = undefined
        }

        this.wsClient = new WebSocketClient(username, password, dispatch);
    }

    private constructor(username: string, password: string, dispatch: ThunkDispatch<AppState, undefined, Command>){
        this.dispatch = dispatch;

        let url = `ws://${username}:${password}@localhost:8080/api/websocket`;

        this.client = new Client({
            brokerURL: url,
            reconnectDelay: 1000,
            debug: msg => console.log(msg)
        });

        this.client.onConnect = () => {
            console.log("WebSocket Connected");
            this.onConnect()
        };

        console.log("Websocket created");

        this.client.onStompError = () => console.log("STOMP error");
        this.client.onWebSocketError = () => console.log("WebSocket error");
        this.client.activate();
    }

    private onConnect(){
        this.client.subscribe("/topic/events", message => {

            let data: Event = JSON.parse(message.body);
            console.log(data);
            switch (data.type) {
                case "NEW_VOTE":
                    let newVote = data.payload;
                    // Using dispatchIgnoredAction to prevent the action from being added to the command history
                    this.dispatch(dispatchIgnoredAction(doAddVote(newVote.postId, newVote.direction)));
                    // I know this is not nice, but i dont't want to have a
                    // separate DTO on the backend (just for this case) that includes the score
                    // (this is just reusing VoteDTO) and
                    // a separate reducer that just updates the score
                    // A simpler solution could be to increment/decrement the score here (in the frontend)
                    // and hope for the best, but that doesn't feel right
                    this.dispatch(fetchPosts(true, true));
                    break;
                case "NEW_QUESTION":
                    let newQuestion = data.payload;
                    newQuestion = {
                        ...newQuestion,
                        posted: new Date(newQuestion.posted)
                    };
                    // Using dispatchIgnoredAction to prevent the action from being added to the command history
                    this.dispatch(dispatchIgnoredAction(doNewPost(newQuestion)));
                    break;
                case "NEW_ANSWER":
                    let {answer, questionId} = data.payload;
                    answer = {
                        ...answer,
                        posted: new Date(answer.posted)
                    };
                    // Using dispatchIgnoredAction to prevent the action from being added to the command history
                    this.dispatch(dispatchIgnoredAction(doAddAnswer(answer, questionId)))
            }
        })
    }
}
