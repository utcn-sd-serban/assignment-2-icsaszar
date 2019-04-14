import Post from "./Post";
import Answer from "./Answer";
import User from "./User";

class Question extends Post{
    title: string;
    answers: Answer[];

    constructor(
        title: string = "",
        text: string = "",
        author: User = new User(),
        id: number = 0,
        posted: Date = new Date(),
        answers: Answer[] = [])
    {
        super(id, text, author, posted);
        this.title = title;
        this.answers = answers;
    }

    addAnswer(answer: Answer) {
        this.answers = [...this.answers, answer];
    }
}

export default Question;