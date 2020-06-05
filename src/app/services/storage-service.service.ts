import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TmdbConfig} from '../ts/domain';
import {HttpClient, HttpParams} from '@angular/common/http';
import {share, tap} from 'rxjs/operators';
import {apiKey, config} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private _config;
    private _imageBaseUrlObs;

    constructor(private http: HttpClient) {
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

}
