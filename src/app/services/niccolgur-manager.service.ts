import {Injectable} from '@angular/core';
import {NiccolgurService} from './niccolgur.service';
import {Niccolgur, Season, User} from '../ts/domain';
import {map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NiccolgurManagerService {

    constructor(private niccolgurService: NiccolgurService) {
    }

    async getUser(userId): Promise<User> {
        const users = await this.niccolgurService.getUsers().toPromise();
        return users.find(el => el.id === userId);
    }

    async getUsers(): Promise<User[]> {
        const queue = await this.niccolgurService.getQueue().toPromise();
        const users = await this.niccolgurService.getUsers().toPromise();
        return queue.map(u =>
            users.find(el => el.id === u)
        );
    }

    async getUserPresence(id: string): Promise<{ present: number, total: number }> {
        const seasons = await this.niccolgurService.getSeasons().toPromise();
        return {
            present: seasons.reduce(
                (presences: number, current: Niccolgur[]) =>
                    presences +
                    current.filter(nicc => nicc.members.includes(id)).length,
                0),
            total: seasons.reduce(
                (total, current) => total + current.length,
                0),
        };
    }

    async getSeasonsCount(): Promise<number> {
        return this.niccolgurService.getSeasons()
            .pipe(
                map(seasons => seasons.length)
            ).toPromise();
    }

    async getSeason(seasonNumber: number): Promise<Season> {
        const season = (await this.niccolgurService.getSeasons().toPromise())[seasonNumber - 1];
        season.forEach((niccolgur, i, ssn) => {
            this.getMovie(niccolgur.movie_id, 'it').then(
                movie => {
                    ssn[i].movie_data = movie;
                    this.getTagline(niccolgur.movie_id).then(tagline => ssn[i].movie_data.tagline = tagline);
                }, err => {
                    ssn[i].movie_data = undefined;
                    throw err;
                });
            this.getUser(niccolgur.master).then(
                user => {
                    ssn[i].master = user;
                }, err => {
                    throw err;
                });
        });
        return season;
    }

    async getTagline(movieId): Promise<string> {
        const ret = await this.niccolgurService.getMovie(movieId, 'it').toPromise();
        if (ret.tagline) {
            return new Promise(() => ret.tagline);
        } else {
            return this.niccolgurService.getMovie(movieId, 'en-US')
                .pipe(map(response => response.tagline || ''))
                .toPromise();
        }
    }

    async getMovie(id: string, lang = 'it'): Promise<any> {
        return this.niccolgurService.getMovie(id, lang).toPromise();
    }

}
