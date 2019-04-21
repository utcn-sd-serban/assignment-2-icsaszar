import Post from './Post';
import User from "./User";

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
    
    static clone(
        {
            text,
            author,
            id,
            posted,
            tempText,
            score
        }: {
            text: string,
            author: User,
            id: number,
            posted: Date,
            tempText: string,
            score: number
        }): Answer {
        return new Answer(text, author, id, posted, tempText, score);
    }
}

export default Answer;