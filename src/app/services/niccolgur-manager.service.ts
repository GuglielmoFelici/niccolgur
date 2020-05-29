import {Injectable} from '@angular/core';
import {NiccolgurService} from './niccolgur.service';
import {Season, User} from '../ts/domain';
import {map} from 'rxjs/operators';
import {addImageUrl, pipeUsersWithImage, pipeUserWithImage} from "../ts/util";

@Injectable({
    providedIn: 'root'
})
export class NiccolgurManagerService {

    constructor(private niccolgurService: NiccolgurService) {
    }

    async getUser(userId): Promise<User> {
        return pipeUserWithImage(this.niccolgurService.getUser(userId)).toPromise();
    }

    async getUsers(): Promise<User[]> {
        return pipeUsersWithImage(this.niccolgurService.getUsers()).toPromise();
    }

    async getUsersQueue(): Promise<User[]> {
        return pipeUsersWithImage(this.niccolgurService.getUsersQueue()).toPromise();
    }

    async getSeasonsCount(): Promise<number> {
        return this.niccolgurService.getSeasons()
            .pipe(
                map(seasons => seasons.length)
            ).toPromise();
    }

    async getSeason(seasonNumber: number, getFullMasterObj = false): Promise<Season> {
        const season = (await this.niccolgurService.getSeasons().toPromise())[seasonNumber - 1];
        if (getFullMasterObj) {
            season.forEach((niccolgur, i, ssn) => {
                this.getUser(niccolgur.master).then(
                    user => {
                        ssn[i].masterFull = user;
                    }, err => {
                        throw err;
                    });
            });
        }
        return season;
    }

    async getSeasons(): Promise<Season[]> {
        const seasons = [];
        const count = await this.getSeasonsCount();
        for (let i = 1; i <= count; i++) {
            seasons.push(await this.getSeason(i));
        }
        return seasons;
    }

    async getTagline(movieId): Promise<string> {
        const ret = await this.niccolgurService.getMovie(movieId, 'it').toPromise();
        return ret.tagline ||
            this.niccolgurService.getMovie(movieId, 'en-US')
                .pipe(map(response => response.tagline || ''))
                .toPromise();
    }

    async getMovie(id: string, lang = 'it'): Promise<any> {
        return this.niccolgurService.getMovie(id, lang).toPromise();
    }

}
