import {profile_pics} from "../../environments/environment";
import {User} from "./domain";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

export const scrollToTop = () => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})

export const addImageUrl = (usr: User) => ({
    img: `${profile_pics}/${usr.id}.jpg`,
    ...usr
})

export const pipeUserWithImage = (usr: Observable<User>) => usr.pipe(map(addImageUrl))

export const pipeUsersWithImage = (usr: Observable<User[]>) => usr.pipe(map(list => list.map(addImageUrl)))

export const decryptToken = (jwt: string): { sub: string, exp: string } => {
    let decodedJwtJson = window.atob(jwt.split('.')[1]);
    let decodedJwt = decodedJwtJson && JSON.parse(decodedJwtJson);
    return {
        sub: decodedJwt.sub,
        exp: decodedJwt.exp,
    }
}
