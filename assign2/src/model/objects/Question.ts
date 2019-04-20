import Post from "./Post";
import Answer from "./Answer";
import User from "./User";
import Tag from "./Tag";

class Question extends Post {
    title: string;
    answers: Answer[];
    tags: Tag[];

    constructor(
        title: string = "",
        text: string = "",
        author: User = new User(),
        tags: Tag[] = [],
        id: number = 0,
        answers: Answer[] = [],
        posted: Date = new Date(),
        tempText: string = text
    ) {
        super(id, text, author, posted, tempText);
        this.title = title;
        this.answers = answers;
        this.tags = tags;
    }

    static clone(
        {
            title,
            text,
            author,
            tags,
            id,
            answers,
            posted,
            tempText
        }: {
            title: string,
            text: string,
            author: User,
            tags: Tag[],
            id: number,
            answers: Answer[],
            posted: Date,
            tempText: string
        }): Question {
        return new Question(title, text, author, tags, id, answers, posted, tempText)
    }
}

export default Question;