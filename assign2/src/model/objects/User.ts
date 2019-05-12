class User {
    readonly name: string = "";
    readonly id: number = 0;

    constructor(name: string = "", id: number = 0) {
        this.name = name;
        this.id = id;
    }

    static clone({name, id}: {name: string, id: number}){
        return new User(name, id)
    }
}

export default User;