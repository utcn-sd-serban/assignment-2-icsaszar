class User {

    constructor(
        readonly name: string = "",
        readonly id: number = 0
    ) {}

    static fromObjectt({name, id}: {name: string, id: number}){
        return new User(name, id)
    }
}

export default User;