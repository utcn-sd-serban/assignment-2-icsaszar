import User from './User';

abstract class Post{
    text: string;
    author: User;
    posted: Date;
    id: number;


    constructor(id: number = 0, text: string = "", author: User = new User(), posted: Date = new Date()) {
        this.text = text;
        this.author = author;
        this.posted = posted;
        this.id = id;
    }
}

export default Post;