import {Component, OnInit} from '@angular/core';
import {Niccolgur, Season} from '../../ts/domain';
import {NiccolgurManagerService} from '../../services/niccolgur-manager.service';
import {StorageService} from '../../services/storage-service.service';

@Component({
    selector: 'app-season',
    templateUrl: './season.component.html',
    styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {

    seasonNumber;
    seasonsCount;
    season: Season;
    error;

    constructor(private niccolgurManager: NiccolgurManagerService,
                private storage: StorageService) {
    }

    ngOnInit() {
        this.niccolgurManager.getSeason(this.seasonNumber).then(
            season => {
                this.season = season;
            }, err => {
                this.error = err;
            });
        this.niccolgurManager.getSeasonsCount().then(
            n => {
                this.seasonsCount = n;
            }, err => {
                this.error = err;
            });
    }

    async getImageUrl(niccolgur: Niccolgur): Promise<string> {
        const images = await this.storage.images.toPromise();
        return this.niccolgurManager.getMovie(niccolgur.movie_id).then(movie => {
            return `${images.base_url}/w500/${movie.poster_path};`
        });
    }


}
