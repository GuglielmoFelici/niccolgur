import {Injectable} from '@angular/core';
import {NiccolgurService} from './niccolgur.service';
import {Niccolgur, Season, User} from '../ts/domain';
import {map} from 'rxjs/operators';
import { pipeUsersWithImage, pipeUserWithImage} from "../ts/util";

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

    async getNiccolgurs(user: User): Promise<Niccolgur[]> {
        return this.niccolgurService.getNiccolgurs(user.id).toPromise();

    }

    /********************************************* Seasons *********************************************
     ***************************************************************************************************/


    async getSeasonsCount(): Promise<string> {
        return this.niccolgurService.getSeasonsCount().toPromise();
    }

    async getSeason(seasonNumber: string): Promise<Season> {
        return this.niccolgurService.getSeason(seasonNumber).toPromise();
    }

    async getSeasonLast(): Promise<Season> {
        return this.niccolgurService.getSeasonLast().toPromise();
    }

    async getSeasons(): Promise<Season[]> {
        const count = parseInt(await this.getSeasonsCount());
        return Promise.all(
            Array(count).fill(null)
                .map((_, i) => this.getSeason(((i+1).toString())))
        )
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
