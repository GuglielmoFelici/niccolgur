import {images} from "../../environments/environment";
import {User} from "./domain";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

export const addImageUrl = (usr: User) => ({
    img: images + `/id/${usr.id}`,
    ...usr
})

export const pipeUserWithImage = (usr: Observable<User>) => usr.pipe(map(addImageUrl))

export const pipeUsersWithImage = (usr: Observable<User[]>) => usr.pipe(map(list => list.map(addImageUrl)))



