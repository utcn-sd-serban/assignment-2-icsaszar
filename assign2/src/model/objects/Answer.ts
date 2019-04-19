import Post from './Post';
import Question from "./Question";
import User from "./User";

class Answer extends Post{
    constructor(
        text: string = "",
        author: User = new User(),
        id: number = 0,
        posted: Date = new Date())
    {
        super(id, text, author, posted);
    }
}

export default Answer;