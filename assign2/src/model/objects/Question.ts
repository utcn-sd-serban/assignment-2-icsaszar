import Post from "./Post";
import Answer from "./Answer";
import User from "./User";
import Tag from "./Tag";

type QuestionFields = {
    [P in keyof Question]: Question[P]
}

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

    static fromJSON(data: QuestionFields){
        return Question.fromObject({
            ...data,
            posted: new Date(data.posted),
            answers: data.answers.map(Answer.fromJSON)
        })
    }

    static fromObject(
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
        }: QuestionFields): Question {
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