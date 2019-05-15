import Post from './Post';
import User from "./User";

type AnswerFields = {
    [P in keyof Answer]: Answer[P]
}

class Answer extends Post {
    constructor(
        text: string = "",
        author: User = new User(),
        id: number = 0,
        posted: Date = new Date(),
        tempText: string = text,
        score: number = 0) {
        super(id, text, author, posted, tempText, score);
    }


    static fromJSON(data: AnswerFields){
        return Answer.fromObject({
            ...data,
            posted: new Date(data.posted)
        })
    }
    
    static fromObject(
        {
            text,
            author,
            id,
            posted,
            tempText,
            score
        }: AnswerFields): Answer {
        return new Answer(text, author, id, posted, tempText, score);
    }
}

export default Answer;

export interface AnswerDTO {
    postId: number;
    text: string;
}