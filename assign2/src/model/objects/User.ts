class User {

    constructor(
        readonly username: string = "",
        readonly id: number = 0
    ) {
    }

    static fromObjectt({name, id}: { name: string, id: number }) {
        return new User(name, id)
    }
}

export default User;