import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AuthData} from "../ts/domain";
import {main} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {StorageService} from "./storage-service.service";
import {tap} from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
                private storage: StorageService) {
    }

    login(username: string, password: string, store = false): Observable<AuthData> {
        return this.http
            .post<AuthData>(main + '/api-token-auth/', {username, password})
            .pipe(
                tap(authData =>
                    this.storage.setItem('auth_data', authData, store ? localStorage : sessionStorage)));
    }

    logout() {
        localStorage.removeItem('auth_data');
        sessionStorage.removeItem('auth_data');
    }

}
