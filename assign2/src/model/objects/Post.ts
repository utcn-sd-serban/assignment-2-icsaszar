import User from './User';

abstract class Post{

    protected constructor(
        readonly id: number,
        readonly text: string,
        readonly author: User,
        readonly posted: Date,
        readonly tempText: string,
        readonly score: number)
    {};
}

export default Post;