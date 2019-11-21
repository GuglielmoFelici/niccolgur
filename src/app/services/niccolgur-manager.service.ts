import {Injectable} from '@angular/core';
import {NiccolgurService} from './niccolgur.service';
import {Season, User} from '../ts/domain';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NiccolgurManagerService {

    constructor(private niccolgurService: NiccolgurService) {
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
        return this.niccolgurService.getSeasons()
            .pipe(
                map(seasons => seasons[seasonNumber])
            ).toPromise();
    }

    async getMovie(id: string): Promise<any> {
        return this.niccolgurService.getMovie(id);
    }

}
