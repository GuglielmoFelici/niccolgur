import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Season, TmdbConfig, User} from '../ts/domain';
import {apiKey, config, movie, niccolgurs, queue, users} from '../ts/endpoints';

@Injectable({
    providedIn: 'root'
})
export class NiccolgurService {

    constructor(private http: HttpClient) {
    }

    getQueue(): Observable<string[]> {
        // const params = new HttpParams().set('api_key', NiccolgurService.apiKey);
        return this.http.get<string[]>(queue);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(users);
    }

    getSeasons(): Observable<Season[]> {
        return this.http.get<Season[]>(niccolgurs);
    }

    getMovie(movieId: string): Observable<any> {
        const params = new HttpParams().set('api_key', apiKey).set('language', 'it');
        return this.http.get(`${movie}/movieId`, {params});
    }
}
