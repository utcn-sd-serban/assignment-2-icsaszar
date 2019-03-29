import User from './User'
import { Component } from 'react';

export default class Post extends Component{
    postText: string;
    posted: Date;
    author: User;
    constructor(text: string, posted: Date, author: User){
        super({});
        this.postText = text;
        this.posted = posted;
        this.author = author;
    }
}