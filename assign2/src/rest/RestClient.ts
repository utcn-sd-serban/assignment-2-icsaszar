import {QuestionDTO} from "../model/objects/Question";
import {AnswerDTO} from "../model/objects/Answer";
import {Vote} from "../model/objects/Vote";

interface OkResponse {
    status: 'succeeded'
    data: Response
}

interface ErrorResponse {
    status: 'error'
    data: Response
}

interface Failed {
    status: 'failed'
}

export type ResponseData = OkResponse | ErrorResponse | Failed

function onSuccess(response: Response): ResponseData {
    if (response.status === 200) {
        return {
            data: response,
            status: 'succeeded'
        };
    } else {
        return {
            data: response,
            status: 'error'
        }
    }
}

function onFailure(err: any): ResponseData {
    console.log(err);
    return {
        status: 'failed'
    }
}

interface HttpRequest {
    info: RequestInfo;
    init: RequestInit;
}

export default class RestClient {

    private static client?: RestClient = undefined;

    static initialize(username: string, password: string){
        if(this.client !== undefined){
            delete this.client;
            this.client = undefined;
        }

        this.client = new RestClient(username, password)
    }

    private readonly username: string;
    private readonly password: string;
    private readonly authorization: string;

    static readonly BASE_URL: string = "http://localhost:8080/";

    private static createRequest(path: String, method: 'GET' | 'POST' | 'PUT' | 'DELETE'): HttpRequest {
        if (this.client === undefined) throw Error("RestClient not initialized!");
        return {
            info: RestClient.BASE_URL + path,
            init: {
                method: method,
                headers: {
                    Authorization: this.client.authorization,
                    'Content-Type': "application/json"
                }
            }
        }
    }

    private static createGetRequest(path: string) {
        return this.createRequest(path, 'GET')
    }

    private static createPostRequest<T>(path: string, body: T) {
        let req = this.createRequest(path, 'POST');
        return {
            ...req,
            init: {
                ...req.init,
                body: (typeof body === 'string') ? body : JSON.stringify(body)
            }
        }
    }

    private static createDeleteRequest(path: string) {
        return this.createRequest(path, "DELETE")
    }

    private static createPutRequest<T>(path: string, body: T) {
        let req = this.createRequest(path, 'PUT');
        return {
            ...req,
            init: {
                ...req.init,
                body: (typeof body === 'string') ? body : JSON.stringify(body)
            }
        }
    }

    private constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
        let nameAndPass = `${username}:${password}`;
        this.authorization = `Basic ${btoa(nameAndPass)}`
    }

    private static async makeAsyncRequest(info: RequestInfo, init: RequestInit) {
        try {
            const response = await fetch(info, init);
            return onSuccess(response);
        } catch (err) {
            return onFailure(err);
        }
    }

    static async loadPosts(): Promise<ResponseData> {
        let {info, init} = this.createGetRequest("questions");
        return RestClient.makeAsyncRequest(info, init);
    }

    static async loadPost(postId: number): Promise<ResponseData> {
        let {info, init} = this.createGetRequest(`questions/${postId}`);
        return RestClient.makeAsyncRequest(info, init);
    }

    static async loadUserDetails(): Promise<ResponseData> {
        let {info, init} = this.createGetRequest("account/details");
        return RestClient.makeAsyncRequest(info, init);
    }

    static async loadTags(): Promise<ResponseData> {
        let {info, init} = this.createGetRequest("tags");
        return RestClient.makeAsyncRequest(info, init);
    }

    static async sendNewPost(newPost: QuestionDTO): Promise<ResponseData> {
        let {info, init} = this.createPostRequest("questions", newPost);
        return RestClient.makeAsyncRequest(info, init);
    }

    static async sendNewAnswer(newAnswer: AnswerDTO): Promise<ResponseData> {
        let {postId} = newAnswer;
        let {info, init} = this.createPostRequest(`questions/${postId}/answers`, newAnswer);
        return RestClient.makeAsyncRequest(info, init);
    }

    static async sendNewTag(newTag: string): Promise<ResponseData> {
        let {info, init} = this.createPostRequest("tags", newTag);
        return RestClient.makeAsyncRequest(info, init);
    }

    static async editQuestion(newText: string, id: number): Promise<ResponseData> {
        let {info, init} = this.createPutRequest(`questions/${id}`, newText);
        return RestClient.makeAsyncRequest(info, init);
    }

    static async editAnswer(newText: string ,answerId: number, questionId: number): Promise<ResponseData> {
        let {info, init} = this.createPutRequest(`questions/${questionId}/answers/${answerId}`, newText);
        return RestClient.makeAsyncRequest(info, init);
    }

    static async voteOnPost(vote: Vote): Promise<ResponseData> {
        let {postId} = vote;
        let {info, init} = this.createPostRequest(`posts/${postId}/votes`, vote);
        return RestClient.makeAsyncRequest(info, init);
    }

    static async deletePost(id: number): Promise<ResponseData> {
        let {info, init} = this.createDeleteRequest(`posts/${id}`);
        return RestClient.makeAsyncRequest(info, init);
    }

    static async deleteAnswer(postId: number, answerId: number): Promise<ResponseData> {
        let {info, init} = this.createDeleteRequest(`posts/${postId}/answers/${answerId}`);
        return RestClient.makeAsyncRequest(info, init);
    }
}


