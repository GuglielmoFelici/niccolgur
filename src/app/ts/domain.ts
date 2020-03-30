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

export interface Niccolgur {
    master: string;
    masterFull?: User;
    movie_id: string;
    movie_data?;
    members: string[];
    date: string;
    offers: string;
}

export type Season = Niccolgur[];

export interface TmdbConfig {
    images?;
    change_keys?;
}
