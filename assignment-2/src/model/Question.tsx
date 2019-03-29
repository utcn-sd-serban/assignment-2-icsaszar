import Post from './Post'
import User from './User';

export default class Question extends Post{
    title: string;
    constructor(title: string, text: string, posted: Date, author: User){
        super(text, posted, author);
        this.title = title;
    }
}