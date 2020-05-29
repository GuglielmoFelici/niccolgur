import {images} from "../../environments/environment";
import {User} from "./domain";

export const addImageUrl = (usr: User) => ({
    img: images + `/${usr.id}`,
    ...usr
})



