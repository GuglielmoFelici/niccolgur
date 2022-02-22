import {Injectable} from '@angular/core';
import {NiccolgurService} from './niccolgur.service';
import {Season, User} from '../ts/domain';
import {map, tap} from 'rxjs/operators';
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

    /********************************************* Seasons *********************************************
     ***************************************************************************************************/

    // TODO questa fix serve per il problema dell'indice della season nel backend
    LAST_SEASON = '11'

    async getSeasonsCount(): Promise<string> {
        return Promise.resolve(this.LAST_SEASON) // TODO rimuovere, vedi sopra
        // return this.niccolgurService.getSeasonsCount().toPromise();
    }

    async getSeason(seasonNumber: string): Promise<Season> {
        return this.niccolgurService.getSeason(seasonNumber).toPromise();
    }

    async getSeasonLast(): Promise<Season> {
        return this.niccolgurService.getSeason(this.LAST_SEASON).toPromise() // TODO rimuovere, vedi sopra
        //return this.niccolgurService.getSeasonLast().toPromise();
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
