import {QuestionDTO} from "../model/objects/Question";
import {AnswerDTO} from "../model/objects/Answer";

export type ResponseData = {
    status: 'succeeded'
    data: Response
} | {status: 'failed'}

function onSuccess(response: Response): ResponseData{
    return  {
        data: response,
        status: 'succeeded'
    };
}
function onFailure(err: any): ResponseData{
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
    readonly username: string;
    readonly password: string;
    readonly authorization: string;

    static readonly BASE_URL: string = "http://localhost:8080/";

    private createRequest(path: String, method: 'GET' | 'POST' | 'PUT' | 'DELETE'): HttpRequest{
        return {
            info: RestClient.BASE_URL + path,
            init: {
                method: method,
                headers: {
                    Authorization: this.authorization,
                    'Content-Type': "application/json"
                }
            }
        }
    }

    private createGetRequest(path: string) {
        return this.createRequest(path, 'GET')
    }

    private createPostRequest<T>(path: string, body: T) {
        let req = this.createRequest(path, 'POST');
        return {
            ...req,
            init: {
                ...req.init,
                body: (typeof body === 'string') ? body : JSON.stringify(body)
            }
        }
    }

    private createDeleteRequest(path: string) {
        return this.createRequest(path, "DELETE")
    }

    private createPutRequest<T>(path: string, body: T){
        let req = this.createRequest(path, 'PUT');
        return {
            ...req,
            init: {
                ...req.init,
                body: (typeof body === 'string') ? body : JSON.stringify(body)
            }
        }
    }

    constructor(username: string, password: string){
        this.username = username;
        this.password = password;
        let nameAndPass = `${username}:${password}`;
        this.authorization = `Basic ${btoa(nameAndPass)}`
    }

    private static async makeAsyncRequest(info: RequestInfo, init: RequestInit){
        try {
            const response = await fetch(info, init);
            return onSuccess(response);
        } catch (err) {
            return onFailure(err);
        }
    }

    async loadPosts(): Promise<ResponseData> {
        let {info, init} = this.createGetRequest("posts");
        return RestClient.makeAsyncRequest(info, init);
    }

    async loadUserDetails(): Promise<ResponseData> {
        let {info, init} = this.createGetRequest("account/details");
        return RestClient.makeAsyncRequest(info, init);
    }

    async loadTags(): Promise<ResponseData> {
        let {info, init} = this.createGetRequest("tags");
        return RestClient.makeAsyncRequest(info, init);
    }

    async sendNewPost(newPost: QuestionDTO): Promise<ResponseData> {
        let {info, init} = this.createPostRequest("posts", newPost);
        return RestClient.makeAsyncRequest(info, init);
    }

    async sendNewAnswer(newAnswer: AnswerDTO): Promise<ResponseData> {
        let {postId} = newAnswer;
        let {info, init} = this.createPostRequest(`posts\\${postId}\\answers`, newAnswer);
        return RestClient.makeAsyncRequest(info, init);
    }

    async sendNewTag(newTag: string): Promise<ResponseData> {
        let {info, init} = this.createPostRequest("tags", newTag);
        return RestClient.makeAsyncRequest(info, init);
    }

    async deletePost(id: number): Promise<ResponseData> {
        let {info, init} = this.createDeleteRequest(`posts\\${id}`);
        return RestClient.makeAsyncRequest(info, init);
    }

    async deleteAnswer(postId: number, answerId: number): Promise<ResponseData> {
        let {info, init} = this.createDeleteRequest(`posts\\${postId}\\answers\\${answerId}`);
        return RestClient.makeAsyncRequest(info, init);
    }
}


