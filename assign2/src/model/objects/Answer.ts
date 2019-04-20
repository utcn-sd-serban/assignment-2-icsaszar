import Post from './Post';
import Question from "./Question";
import User from "./User";

class Answer extends Post {
    constructor(
        text: string = "",
        author: User = new User(),
        id: number = 0,
        posted: Date = new Date(),
        tempText: string = text) {
        super(id, text, author, posted, tempText);
    }
    
    static clone(
        {
            text,
            author,
            id,
            posted,
            tempText
        }: {
            text: string,
            author: User,
            id: number,
            posted: Date,
            tempText: string
        }): Answer {
        return new Answer(text, author, id, posted, tempText);
    }
}

export default Answer;