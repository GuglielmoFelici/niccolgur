import {Component, OnInit} from '@angular/core';
import {NiccolgurManagerService} from '../../../services/niccolgur-manager.service';
import {MatOptionSelectionChange} from '@angular/material';
import {profile_pics} from "../../../../environments/environment";

@Component({
    selector: 'app-season',
    templateUrl: './season.component.html',
    styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {

    seasonNumber;
    seasonsCount = "0";
    seasonsOptions = [];
    season = [];
    error;
    images = profile_pics;

    constructor(private niccolgurManager: NiccolgurManagerService) {
    }

    catchErr = (e) => this.error = e;

    ngOnInit() {
        this.niccolgurManager.getSeasonLast().then(
            ssn => this.season = ssn.reverse(), this.catchErr
        )
        this.niccolgurManager.getSeasonsCount().then(
            n => {
                this.seasonsCount = n;
                this.seasonsOptions = new Array(parseInt(n));
            }, this.catchErr
        )
    }

    changeSeason(n) {
        this.seasonNumber = n;
        this.niccolgurManager.getSeason(n).then(
            season => {
                /* This is needed to trigger change detection */
                this.season = [];
                season.forEach(e => this.season.push(e));
                this.season.reverse();
            }, this.catchErr);
    }

    /* Handlers */

    selectionChange(event: MatOptionSelectionChange, option) {
        if (event.source.selected) {
            this.changeSeason(option);
        }
    }

}
