import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Season, User} from '../ts/domain';
import {apiKey, movie, niccolgurs, queue, users} from '../ts/env';

@Injectable({
    providedIn: 'root'
})
export class NiccolgurService {

    constructor(private http: HttpClient) {
    }

    getQueue(): Observable<string[]> {
        return this.http.get<string[]>(queue);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(users);
    }

    getSeasons(): Observable<Season[]> {
        return this.http.get<Season[]>(niccolgurs);
    }

    getMovie(movieId: string, lang: string): Observable<any> {
        const params = new HttpParams().set('api_key', apiKey).set('language', lang);
        return this.http.get(`${movie}/${movieId}`, {params});
    }
}
