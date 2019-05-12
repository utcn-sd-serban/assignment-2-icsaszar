import {QuestionDTO} from "../model/objects/Question";


type ResponseData = {
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

export default class RestClient {
    readonly username: string;
    readonly password: string;
    readonly authorization: string;

    static readonly BASE_URL: string = "http://localhost:8080/";

    private makeRequest(path: String, method: 'GET' | 'POST' | 'PUT' | 'DELETE'){
        return {
            info: RestClient.BASE_URL + path,
            init: {
                method: method,
                headers: {
                    'Authorization': this.authorization,
                    'Content-Type': "application/json"
                }
            }
        }
    }

    private makeGetRequest(path: string) {
        return this.makeRequest(path, 'GET')
    }

    private makePostRequest<T>(path: string, body: T) {
        let req = this.makeRequest(path, 'POST');
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

    loadPosts(): Promise<ResponseData>{
        let {info, init} = this.makeGetRequest("posts");
        return fetch(info, init).then(
                onSuccess,
                onFailure)
    }

    loadUserDetails(): Promise<ResponseData>{
        let {info, init} = this.makeGetRequest("account/details");
        return fetch(info, init).then(
            onSuccess,
            onFailure
        )
    }

    loadTags(): Promise<ResponseData>{
        let {info, init} = this.makeGetRequest("tags");
        return fetch(info, init).then(
            onSuccess,
            onFailure
        )
    }

    sendNewPost(newPost: QuestionDTO): Promise<ResponseData>{
        let {info, init} = this.makePostRequest("posts", newPost);
        return  fetch(info, init).then(
            onSuccess,
            onFailure
        )
    }

    sendNewTag(newTag: string): Promise<ResponseData>{
        let {info, init} = this.makePostRequest("tags", newTag);
        return  fetch(info, init).then(
            onSuccess,
            onFailure
        )
    }
}


