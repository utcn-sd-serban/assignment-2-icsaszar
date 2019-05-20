export type VoteDirection = "up" | "down";

export class Vote {


    constructor(
        readonly postId: number,
        readonly direction: VoteDirection
    ) {}

    static fromObject(
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