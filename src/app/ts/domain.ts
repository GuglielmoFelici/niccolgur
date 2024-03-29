export class TypeObject {
    id: string;
    desc?: string;
    data?: any;

    constructor(id: string, desc?: string, data?: any) {
        this.id = id;
        this.desc = desc;
        this.data = data;
    }

}

export interface User {
    id: string;
    username: string;
    nickname: string;
    bio?: string;
    img?: string;
}

export interface AuthData {
    token: string,
    user: User
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
