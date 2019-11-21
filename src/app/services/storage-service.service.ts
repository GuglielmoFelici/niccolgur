import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TmdbConfig} from '../ts/domain';
import {HttpClient, HttpParams} from '@angular/common/http';
import {apiKey, config} from '../ts/endpoints';
import {share, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private _images;
    private _imageBaseUrlObs;
    private _posterSizes;
    private _fileSize;
    private _fileSizeObs;

    constructor(private http: HttpClient) {
    }

    public get images(): Observable<any> {
        const params = new HttpParams().set('api_key', apiKey);
        if (this._images) {
            return of(this._images);
        } else if (this._imageBaseUrlObs) {
            return this._imageBaseUrlObs;
        } else {
            this._imageBaseUrlObs = this.http.get<TmdbConfig>(config, {params}).pipe(
                tap((response) => this._images = response.images),
                share()
            );
            return this._imageBaseUrlObs;
        }
    }
}
