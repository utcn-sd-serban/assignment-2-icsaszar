import Post from './Post';
import Question from "./Question";
import User from "./User";

class Answer extends Post{
    answerTo: Question;

    constructor(
        text: string = "",
        author: User = new User(),
        answerTo: Question,
        id: number = 0,
        posted: Date = new Date())
    {
        super(id, text, author, posted);
        this.answerTo = answerTo;
    }
}

export default Answer;