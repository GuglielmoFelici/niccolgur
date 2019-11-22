import {Injectable} from '@angular/core';
import {NiccolgurService} from './niccolgur.service';
import {Season, User} from '../ts/domain';
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

    async getSeasonsCount(): Promise<number> {
        return this.niccolgurService.getSeasons()
            .pipe(
                map(seasons => seasons.length)
            ).toPromise();
    }

    async getSeason(seasonNumber: number): Promise<Season> {
        const season = (await this.niccolgurService.getSeasons().toPromise())[seasonNumber - 1];
        season.forEach((niccolgur, i, ssn) => {
            this.getMovie(niccolgur.movie_id, 'it', true).then(
                movie => {
                    ssn[i].movie_data = movie;
                }, err => {
                        this.getMovie(niccolgur.movie_id, 'en-US', false).then(
                            movie => {
                                ssn[i].movie_data = movie;
                            }, () => {
                                ssn[i].movie_data = undefined;
                            });
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

    async getMovie(id: string, lang = 'it', requireTagline = false): Promise<any> {
        return this.niccolgurService.getMovie(id, lang).pipe(tap(response => {
            if (requireTagline && !response.tagline) {
                throw new Error('tagline');
            }
        })).toPromise();
    }

}
