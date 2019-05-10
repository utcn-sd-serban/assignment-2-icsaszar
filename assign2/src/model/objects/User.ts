class User {
    name: string = "";
    id: number = 0;

    constructor(name: string = "", id: number = 0) {
        this.name = name;
        this.id = id;
    }
}

export default User;