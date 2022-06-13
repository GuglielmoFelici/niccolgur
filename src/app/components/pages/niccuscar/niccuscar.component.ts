import {Component, OnInit} from '@angular/core';
import {Niccolgur, User} from "../../../ts/domain";
import {StorageService} from "../../../services/storage-service.service";
import {NiccolgurManagerService} from "../../../services/niccolgur-manager.service";
import {MatOptionSelectionChange} from "@angular/material/core";

export type NiccuscarVote = {
    key: string,
    name: string,
    type: 'BINARY' | 'TOP5' | 'MASTER',
    values: Niccolgur[]
    masterValues?: {[key:string] : Niccolgur}
}

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

    votes: { [key: string] : NiccuscarVote} = {
        bestMovie: {
            key: 'bestMovie',
            name: 'Miglior film',
            type: 'TOP5',
            values: [],
        },
        worstMovie: {
            key: 'worstMovie',
            name: 'Peggior film',
            type: 'TOP5',
            values: []
        },
        bestFromMaster: {
            key: 'bestFromMaster',
            name: 'Miglior film di ',
            type: 'MASTER',
            values: [],
            masterValues: {},
        },
        worstFromMaster: {
            key: 'worstFromMaster',
            name: 'Peggior film di ',
            type: 'MASTER',
            values: [],
            masterValues: {}
        },
        bestTits: {
            key: 'bestTits',
            name: 'Miglior tette/culo/fica',
            type: 'BINARY',
            values: []
        },
        bestThrow: {
            key: 'bestThrow',
            name: 'Miglior throw',
            type: 'BINARY',
            values: []
        },
        bestMemes: {
            key: 'bestMemes',
            name: 'Migliori memes',
            type: 'BINARY',
            values: []
        },
        hardest: {
            key: 'hardest',
            name: 'Film più difficile da guardare',
            type: 'BINARY',
            values: []
        },
        cheguerini: {
            key: 'cheguerini',
            name: 'Premio Cheguerini',
            type: 'BINARY',
            values: []
        },
        virgilio: {
            key: 'virgilio',
            name: 'Premio Virgilio',
            type: 'BINARY',
            values: []
        },
        unexpected: {
            key: 'unexpected',
            name: 'Film più unexpected',
            type: 'BINARY',
            values: []
        },
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

    votesAsArray(typeFilter? : 'BINARY' | 'TOP5' | 'MASTER') {
        return Object.entries(this.votes).map(val => val[1]).filter(v => v.type === typeFilter)
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

    votesChange(votes: { [p: string]: NiccuscarVote }) {
        this.votes = votes;
        // TODO send to server
    }
}
