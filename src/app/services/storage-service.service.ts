import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {TmdbConfig, Token, User} from '../ts/domain';
import {HttpClient, HttpParams} from '@angular/common/http';
import {share, tap} from 'rxjs/operators';
import {apiKey, config} from "../../environments/environment";
import {AuthService} from "./auth.service";
import * as moment from "moment";
import {NiccolgurManagerService} from "./niccolgur-manager.service";

export const TOKEN_PAYLOAD_KEY = "jwt"
export const TOKEN_EXPIRATION_KEY = "jwt-expires-at"
export const USER_KEY = "user"

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private _config;
    private _imageBaseUrlObs;

    constructor(private http: HttpClient) {
    }

    private setItem<T>(key: string, item: T) {
        localStorage.setItem(key, JSON.stringify(item))
    }

    private getItem<T>(key: string): T {
        return JSON.parse(localStorage.getItem(key))
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
        return this.getItem(USER_KEY);
    }

    public get token(): Token {
        return {
            payload: this.getItem(TOKEN_PAYLOAD_KEY),
            expiration: this.expiration
        }
    }

    get loggedUserId(): string {
        if (this.isLoggedIn) {
            let decodedJwtJson = window.atob(this.token.payload.split('.')[1]);
            return decodedJwtJson && JSON.parse(decodedJwtJson).sub
        }
    }

    public get expiration() {
        return this.getItem<number>(TOKEN_EXPIRATION_KEY);
    }

    public get expiresAt() {
        return moment(this.expiration);
    }

    public get isLoggedIn() {
        return moment().isBefore(moment(this.expiresAt));
    }

    public get isLoggedOut() {
        return !this.isLoggedIn;
    }

}
