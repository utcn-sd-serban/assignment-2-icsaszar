import User from "./objects/User";
import Question from "./objects/Question";
import Tag from "./objects/Tag";
import Answer from "./objects/Answer";

export const users: User[] = [
    {
        id: 1,
        name: "User1"
    },
    {
        id: 2,
        name: "bork2121"
    },
    {
        id: 3,
        name: "thedudehimself"
    },
    {
        id: 4,
        name: "opisanidiot"
    },
    {
        id: 5,
        name: "justfinishedcollege"
    }
];

const answers: Answer[] = [
    new Answer("You do B", users[2], 1),
    new Answer("Why would anybody want to do A?", users[3], 2),
    new Answer("It's 2019, nobody uses A", users[4], 3),
    new Answer("I have the same problem", users[1], 4)
];

export const tags: Tag[] = [
    new Tag("java", 1),
    new Tag("javascript",2),
    new Tag("pythonscript", 3),
    new Tag("general", 4),
    new Tag("react", 5)
];

export const questions: Question[] = [
    new Question(
        "Pls help",
        "Help my program keeps crashing",
        users[0],
        tags.slice(3, 4),
        1,
        answers.slice(3,4)),
    new Question(
        "How do I A?",
        "Can someone please explain me how to do A?",
        users[1],
        tags.slice(0, 2),
        2,
        answers.slice(0, 3))
];