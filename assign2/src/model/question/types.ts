import User from "../objects/User";
import Question from "../objects/Question";
import Tag from "../objects/Tag";

export const NEW_POST = "NEW_POST";

export interface QuestionsState{
    questions: Question[]
}

interface NewPostAction{
    type: typeof NEW_POST,
    newPost: {
        title: string,
        text: string,
        author: User,
        tags: Tag[]
    }
}

export type QuestionActions = NewPostAction;