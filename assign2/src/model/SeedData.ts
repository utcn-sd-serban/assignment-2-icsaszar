import User from "./objects/User";
import Question from "./objects/Question";
import Tag from "./objects/Tag";

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
    }
];

export const tags: Tag[] = [
    new Tag("java", 1),
    new Tag("javascript",2),
    new Tag("pythonscript", 3),
    new Tag("general", 4)
];

export const questions: Question[] = [
    new Question(
        "Pls help",
        "Help my program keeps crashing",
        users[0],
        tags.slice(3,4),
        1),
    new Question(
        "How do I A?",
        "Can someone please explain me how to do A?",
        users[1],
        tags.slice(0,2),
        2)
];