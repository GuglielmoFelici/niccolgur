import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Niccolgur, Season} from '../../ts/domain';
import {NiccolgurManagerService} from '../../services/niccolgur-manager.service';
import {StorageService} from '../../services/storage-service.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
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
                private storage: StorageService,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.niccolgurManager.getSeasonsCount().then(
            n => {
                this.seasonsCount = n;
                this.changeSeason(n);
            }, err => {
                this.error = err;
            });
    }

    async getImageUrl(niccolgur: Niccolgur): Promise<string> {
        const config = await this.storage.config.toPromise();
        return this.niccolgurManager.getMovie(niccolgur.movie_id)
            .then(
                movie => {
                    return `${config.images.base_url}/w500/${movie.poster_path}`;
                },
                err => {
                    console.log(err);
                    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Dialog-error-round.svg/768px-Dialog-error-round.svg.png';
                });
    }

    changeSeason(n) {
        this.seasonNumber = n;
        this.niccolgurManager.getSeason(n).then(
            season => {
                console.log(season);
                this.season = season;
            }, err => {
                this.error = err;
            });
        this.cd.detectChanges();
        this.cd.detach();
    }

}
