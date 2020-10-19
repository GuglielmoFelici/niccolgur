import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Token} from "../ts/domain";
import {main} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import * as moment from "moment";
import {tap} from "rxjs/operators";
import {NiccolgurManagerService} from "./niccolgur-manager.service";
import {TOKEN_EXPIRATION_KEY, TOKEN_PAYLOAD_KEY, USER_KEY} from "./storage-service.service";
import {decryptToken} from "../ts/util";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
                private niccService: NiccolgurManagerService) {
    }

    login(username: string, password: string): Observable<Token> {
        return this.http
            .post<Token>(main + '/login', {username, password}) // TODO estrarre endpoint
            .pipe(
                tap((tkn) => this.saveLogin(tkn, this.niccService))
            );
    }

    saveLogin(token: Token, niccService: NiccolgurManagerService) {
        const expiresAt = moment().add(token.expiration, 'second');
        localStorage.setItem(TOKEN_PAYLOAD_KEY, token.payload)
        localStorage.setItem(TOKEN_EXPIRATION_KEY, JSON.stringify(expiresAt.valueOf()));
        niccService.getUser(decryptToken(token.payload).sub)
            .then(usr =>
                localStorage.setItem(USER_KEY, JSON.stringify(usr)))
    }

    logout() {
        localStorage.removeItem(TOKEN_PAYLOAD_KEY);
        localStorage.removeItem(TOKEN_EXPIRATION_KEY);
        localStorage.removeItem(USER_KEY);
    }

}
