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

    // TODO performance di questo metodo?
    getSsnFullMaster = (ssn: Season) =>
        ssn.forEach(async nicc =>
            nicc.masterFull = await this.getUser(nicc.master)
        );

    async getSeasonsCount(): Promise<string> {
        return this.niccolgurService.getSeasonsCount().toPromise();
    }

    async getSeason(seasonNumber: string): Promise<Season> {
        return this.niccolgurService.getSeason(seasonNumber).toPromise();
            // .pipe(
            //     tap(ssn => getFullMasterObj ? this.getSsnFullMaster(ssn) : (_) => {})
            // ).toPromise();
    }

    async getSeasonLast(getFullMasterObj = false): Promise<Season> {
        return this.niccolgurService.getSeasonLast().toPromise();
            // .pipe(
            //     tap(ssn => getFullMasterObj ? this.getSsnFullMaster(ssn) : (_) => {})
            // ).toPromise();
    }

    async getSeasons(): Promise<Season[]> {
        const seasons = [];
        const count = await this.getSeasonsCount();
        for (let i = 1; i <= parseInt(count); i++) {
            seasons.push(await this.getSeason(i.toString()));
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
