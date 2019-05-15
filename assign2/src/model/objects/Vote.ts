export type VoteDirection = "up" | "down";

export class Vote {
    readonly direction: VoteDirection;

    constructor(
        readonly postId: number,
        direction: VoteDirection | (1 | -1))
    {
        if(typeof direction === 'object')
            this.direction = direction;
        else
            this.direction = (direction === 1) ? "up" : "down";

    }

    static fromObject(
        {
            postId,
            direction
        }: {
            postId: number,
            direction: VoteDirection | (1 | -1)
        }){
        return new Vote(postId, direction);
    }
}