import User from './User';

abstract class Post{
    text: string;
    author: User;
    posted: Date;
    id: number;
    tempText: string;
    score: number;


    protected constructor(
        id: number = 0,
        text: string = "",
        author: User = new User(),
        posted: Date = new Date(),
        tempText: string = text,
        score: number = 0)
    {
        this.text = text;
        this.author = author;
        this.posted = posted;
        this.id = id;
        this.tempText = tempText;
        this.score = score;
    }
}

export default Post;