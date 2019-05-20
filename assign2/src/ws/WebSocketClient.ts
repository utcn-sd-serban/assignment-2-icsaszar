import {Client, IMessage} from "@stomp/stompjs";
import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../model/Model";
import {Command} from "../model/command/types";
import Question from "../model/objects/Question";
import {doNewPost} from "../model/question/postlist/actions";
import {Vote} from "../model/objects/Vote";
import {doAddVote} from "../model/user/actions";

const NEW_QUESTION_EVENT = "NEW_QUESTION";
const NEW_VOTE_EVENT = "NEW_VOTE";

interface NewQuestionEvent {
    type: typeof NEW_QUESTION_EVENT;
    payload: Question
}

interface NewVoteEvent {
    type: typeof NEW_VOTE_EVENT
    payload: Vote
}

type Event = NewQuestionEvent | NewVoteEvent

export class WebSocketClient{
    private readonly client: Client;
    private readonly dispatch: ThunkDispatch<AppState, undefined, Command>;
    private static wsClient?: WebSocketClient = undefined;

    static make(username: string, password: string, dispatch: ThunkDispatch<AppState, undefined, Command>){
        if(this.wsClient === undefined)
            this.wsClient = new WebSocketClient(username, password, dispatch)
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
                    this.dispatch(doAddVote(newVote.postId, newVote.direction));
                    break;
                case "NEW_QUESTION":
                    let newQuestion = data.payload;
                    newQuestion = {
                        ...newQuestion,
                        posted: new Date(newQuestion.posted)
                    };
                    this.dispatch(doNewPost(newQuestion));
                    break;
            }
        })
    }
}
