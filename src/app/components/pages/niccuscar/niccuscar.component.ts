import {Component, OnInit} from '@angular/core';
import {User} from "../../../ts/domain";
import {StorageService} from "../../../services/storage-service.service";
import {NiccolgurManagerService} from "../../../services/niccolgur-manager.service";
import {MatOptionSelectionChange} from "@angular/material/core";


@Component({
    selector: 'app-niccuscar',
    templateUrl: './niccuscar.component.html',
    styleUrls: ['./niccuscar.component.css']
})
export class NiccuscarComponent implements OnInit {

    user: User;
    error = '';
    selectedGrouping = 0;

    niccolgurs = []

    masters = []

    seasons = []

    selectedSeason;

    selectedMaster;

    groupings = [
        {
            id: 0,
            name: "Cerca per season"
        },
        {
            id: 1,
            name: "Cerca per master"
        },
    ];

    votes = {
        bestMovie: {},
        worstMovie: {},
        bestFromMaster: {},
        worstFromMaster: {},
        bestTits: '',
        bestThrow: '',
        bestMemes: '',
        hardest: '',
        cheguerini: '',
        virgilio: '',
        unexpected: '',
    }

    movieCache = {}

    constructor(
        private manager: NiccolgurManagerService,
        private storage: StorageService) {
    }

    ngOnInit(): void {
        this.manager.getUser(this.storage.loggedUser.id)
            .then(
                user => this.user = user
            ).catch(
            e => this.error = 'Errore sconosciuto.'
        )

        this.manager.getSeasonsCount().then(
            count => {
                this.seasons = [...Array(parseInt(count)).keys()]
                this.selectedSeason = count
                this.manager.getSeasonLast()
                    .then(ssn => this.niccolgurs = ssn)
            }
        )

        this.manager.getUsers().then(
            users => {
                this.masters = users
                this.selectedMaster = users[0]
            }
        )

    }

    groupingChange(event: MatOptionSelectionChange, option) {
        if (event.source.selected) {
            this.selectedGrouping = option;
            console.log(option);
            if (option === 0) {
                this.seasonChange(this.selectedSeason)
            } else {
                this.masterChange(this.selectedMaster)
            }
        }
    }

    seasonChange(option) {
        this.selectedSeason = option;
        this.manager.getSeason(option)
            .then(ssn => this.niccolgurs = ssn)
    }

    masterChange(option) {
        this.selectedMaster = option;
        this.manager.getNiccolgurs(option)
            .then(ssn => this.niccolgurs = ssn)
    }

    getMovie(id: string) {
        if (!id) return
        const movie = this.movieCache[id]
        if (!movie) {
            this.movieCache[id] = 'caching'
            this.manager.getMovie(movie).then(
                this.movieCache[id] = movie
            )
            return
        }
         else if (movie === 'caching') {
            return
        } else {
            return movie
        }
    }

}
