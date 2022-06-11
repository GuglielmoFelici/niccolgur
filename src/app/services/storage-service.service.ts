import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {TmdbConfig, AuthData, User} from '../ts/domain';
import {HttpClient, HttpParams} from '@angular/common/http';
import {share, tap} from 'rxjs/operators';
import {apiKey, config} from "../../environments/environment";
import {AuthService} from "./auth.service";
import * as moment from "moment";
import {NiccolgurManagerService} from "./niccolgur-manager.service";

export const TOKEN_KEY = "token"
export const USER_KEY = "user"

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private _config;
    private _imageBaseUrlObs;

    constructor(private http: HttpClient) {
    }

    public setItem<T>(key: string, item: T, storage=localStorage) {
        storage.setItem(key, JSON.stringify(item))
    }

    public getItem<T>(key: string, storage=localStorage): T {
        return JSON.parse(storage.getItem(key))
    }

    public get config(): Observable<any> {
        const params = new HttpParams().set('api_key', apiKey);
        if (this._config) {
            return of(this._config);
        } else if (this._imageBaseUrlObs) {
            return this._imageBaseUrlObs;
        } else {
            this._imageBaseUrlObs = this.http.get<TmdbConfig>(config, {params}).pipe(
                tap((response) => this._config = response),
                share()
            );
            return this._imageBaseUrlObs;
        }
    }

    public get loggedUser(): User {
        const auth : AuthData = this.getItem('auth_data', sessionStorage) || this.getItem('auth_data', localStorage);
        if (auth) {
            return auth.user
        }
    }

    public get token(): string {
        const auth : AuthData = this.getItem('auth_data', sessionStorage) || this.getItem('auth_data', localStorage);
        if (auth) {
            return auth.token
        }
    }


    public get isLoggedIn() {
        return this.token;
    }

    public get isLoggedOut() {
        return !this.isLoggedIn;
    }

}
