import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Season, AuthData, User } from '../ts/domain';
import { apiKey, main, movie, queue, seasons, users } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class NiccolgurService {

    constructor(private http: HttpClient) {
    }

    /********************************************* Queue ***********************************************
     ***************************************************************************************************/

    getUsersQueue(): Observable<User[]> {
        return this.http.get<User[]>(`${queue}/`);
    }

    /********************************************* Users ***********************************************
     ***************************************************************************************************/

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${users}/`);
    }

    getUser(id: string): Observable<User> {
        return this.http.get<User>(`${users}/${id}/`);
    }


    /********************************************* Seasons *********************************************
     ***************************************************************************************************/

    getSeason(id: string) {
        return this.http.get<Season>(`${seasons}/${id}/`);
    }

    getSeasonLast() {
        return this.http.get<Season>(`${seasons}/-1/`);
    }

    // getSeasons(): Observable<Season[]> {
    //     return this.http.get<Season[]>(niccolgurs);
    // }

    getSeasonsCount(): Observable<string> {
        return this.http.get<string>(`${seasons}/count`)
    }

    /********************************************* TMDB ***********************************************
     ***************************************************************************************************/

    getMovie(movieId: string, lang: string): Observable<any> {
        const params = new HttpParams().set('api_key', apiKey).set('language', lang);
        return this.http.get(`${movie}/${movieId}`, { params });
    }
}
