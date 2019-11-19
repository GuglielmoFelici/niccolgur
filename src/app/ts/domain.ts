export class TypeObject {
    id: string;
    desc?: string;
    data?: string;

    constructor(id: string, desc?: string, data?: string) {
        this.id = id;
        this.desc = desc;
        this.data = data;
    }

}

export class User {
    id: string;
    nickname: string;
    img: string;
    bio?: string;

    constructor(id: string, nickname: string, img: string, bio?: string) {
        this.id = id;
        this.nickname = nickname;
        this.img = img;
        this.bio = bio;
    }

}
