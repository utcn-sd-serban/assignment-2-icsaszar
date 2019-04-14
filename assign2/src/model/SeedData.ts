import User from "./objects/User";
import Question from "./objects/Question";

export const users: User[] = [
    {
        id: 1,
        name: "User1"
    },
    {
        id: 2,
        name: "User2"
    },
    {
        id: 3,
        name: "User3"
    }
];

export const questions: Question[] = [
    new Question(
        "Pls help",
        "Help my program keeps crashing",
        users[0],
        1,
        new Date()),
    new Question(
        "How do i do A?",
        "Can someone please explain me how to do A?",
        users[1],
        2,
        new Date())
];