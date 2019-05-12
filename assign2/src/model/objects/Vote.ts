export type VoteDirection = "up" | "down";

export class Vote {
    readonly postId: number;
    readonly direction: VoteDirection;

    constructor(postId: number, direction: VoteDirection | number) {
        this.postId = postId;
        if(typeof direction === 'object')
            this.direction = direction;
        else
            this.direction = (direction === 1) ? "up" : "down";

    }

    static clone(
        {
            postId,
            direction
        }: {
            postId: number,
            direction: VoteDirection | number
        }){
        return new Vote(postId, direction);
    }
}