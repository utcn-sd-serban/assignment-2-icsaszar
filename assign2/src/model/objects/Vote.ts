import Post from "./Post";

export type VoteDirection = "up" | "down";

export class Vote {
    postId: number;
    direction: VoteDirection;

    constructor(postId: number, direction: VoteDirection) {
        this.postId = postId;
        this.direction = direction;
    }

    static clone(
        {
            postId,
            direction
        }: {
            postId: number,
            direction: VoteDirection
        }){
        return new Vote(postId, direction);
    }
}