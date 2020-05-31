import {Component, OnInit} from '@angular/core';
import {NiccolgurManagerService} from '../../../services/niccolgur-manager.service';
import {MatOptionSelectionChange} from '@angular/material';
import {images} from 'src/environments/environment';

@Component({
    selector: 'app-season',
    templateUrl: './season.component.html',
    styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {

    seasonNumber;
    seasonsCount;
    season = [];
    error;
    images = images;

    constructor(private niccolgurManager: NiccolgurManagerService) {
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

    changeSeason(n) {
        this.seasonNumber = n;
        this.niccolgurManager.getSeason(n).then(
            season => {
                this.season = [];
                season.forEach(e => this.season.push(e));
                this.season.reverse();
            }, err => {
                this.error = err;
            });
    }

    /* Handlers */

    selectionChange(event: MatOptionSelectionChange, option) {
        if (event.source.selected) {
            this.changeSeason(option);
        }
    }

    getSeasonsOptions() {
        return new Array(this.seasonsCount);
        // const ret = [];
        // for (let i = 1; i <= this.seasonsCount; i++) {
        //     ret.push(i);
        // }
        // return ret;
    }

}
