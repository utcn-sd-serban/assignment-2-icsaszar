import Post from "./Post";
import Answer from "./Answer";
import User from "./User";
import Tag from "./Tag";

class Question extends Post {
    readonly title: string;
    readonly answers: Answer[];
    readonly tags: Tag[];

    constructor(
        title: string = "",
        text: string = "",
        author: User = new User(),
        tags: Tag[] = [],
        id: number = 0,
        answers: Answer[] = [],
        posted: Date = new Date(),
        tempText: string = text,
        score: number = 0
    ) {
        super(id, text, author, posted, tempText, score);
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
            tempText,
            score
        }: {
            title: string,
            text: string,
            author: User,
            tags: Tag[],
            id: number,
            answers: Answer[],
            posted: Date,
            tempText: string,
            score: number
        }): Question {
        return new Question(title, text, author, tags, id, answers, posted, tempText, score)
    }

    static toDTO(question: Question): QuestionDTO{
        return {
            author: question.author,
            tags: question.tags,
            text: question.text,
            title: question.title
        }
    }
}

export default Question;

export type QuestionDTO = Pick<Question, 'title' | 'text' | 'author' | 'tags'>