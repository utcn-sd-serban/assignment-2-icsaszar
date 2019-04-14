import Post from "./Post";
import Answer from "./Answer";
import User from "./User";
import Tag from "./Tag";

class Question extends Post{
    title: string;
    answers: Answer[];
    tags: Tag[];

    constructor(
        title: string = "",
        text: string = "",
        author: User = new User(),
        tags: Tag[] = [],
        id: number = 0,
        posted: Date = new Date(),
        answers: Answer[] = [])
    {
        super(id, text, author, posted);
        this.title = title;
        this.answers = answers;
        this.tags = tags;
    }

    addAnswer(answer: Answer) {
        this.answers = [...this.answers, answer];
    }
}

export default Question;