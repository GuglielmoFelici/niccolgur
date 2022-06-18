import {Component, OnInit} from '@angular/core';
import {Niccolgur, User} from "../../../ts/domain";
import {StorageService} from "../../../services/storage-service.service";
import {NiccolgurManagerService} from "../../../services/niccolgur-manager.service";
import {MatOptionSelectionChange} from "@angular/material/core";

export type NiccuscarVote = {
    key: string,
    name: string,
    type: 'TOP5' | 'MASTER',
    values: Niccolgur[],
    masterValues?: { [key: string]: Niccolgur },
    candidates: Niccolgur[],
    masterCandidates?: { [key: string]: Niccolgur[] },
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

    votes: { [key: string]: NiccuscarVote } = {
        bestMovie: {
            key: 'bestMovie',
            name: 'Miglior film',
            type: 'TOP5',
            values: [],
            candidates: [],
        },
        worstMovie: {
            key: 'worstMovie',
            name: 'Peggior film',
            type: 'TOP5',
            values: [],
            candidates: [],
        },
        bestFromMaster: {
            key: 'bestFromMaster',
            name: 'Miglior film di ',
            type: 'MASTER',
            values: [],
            masterValues: {},
            candidates: [],
            masterCandidates: {},
        },
        worstFromMaster: {
            key: 'worstFromMaster',
            name: 'Peggior film di ',
            type: 'MASTER',
            values: [],
            masterValues: {},
            candidates: [],
            masterCandidates: {},
        },
        bestTits: {
            key: 'bestTits',
            name: 'Miglior tette/culo/fica',
            type: 'TOP5',
            values: [],
            candidates: [],
        },
        bestThrow: {
            key: 'bestThrow',
            name: 'Miglior throw',
            type: 'TOP5',
            values: [],
            candidates: [],
        },
        bestMemes: {
            key: 'bestMemes',
            name: 'Migliori memes',
            type: 'TOP5',
            values: [],
            candidates: [],
        },
        hardest: {
            key: 'hardest',
            name: 'Film più difficile da guardare',
            type: 'TOP5',
            values: [],
            candidates: [],
        },
        cheguerini: {
            key: 'cheguerini',
            name: 'Premio Cheguerini',
            type: 'TOP5',
            values: [],
            candidates: [],
        },
        virgilio: {
            key: 'virgilio',
            name: 'Premio Virgilio',
            type: 'TOP5',
            values: [],
            candidates: [],
        },
        unexpected: {
            key: 'unexpected',
            name: 'Film più unexpected',
            type: 'TOP5',
            values: [],
            candidates: [],
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

    votesAsArray(typeFilter?: 'TOP5' | 'TOP5' | 'MASTER') {
        const votes = Object.entries(this.votes).map(val => val[1])
        return typeFilter
            ? votes.filter(v => v.type === typeFilter)
            : votes
    }


    groupingChange(event: MatOptionSelectionChange, option) {
        if (event.source.selected) {
            this.selectedGrouping = option;
            if (option === 0) {
                this.seasonChange(this.selectedSeason)
            } else {
                this.masterChange(this.selectedMaster)
            }
        }
    }

    seasonChange(option, event?) {
        if (!event || event.source.selected) {
            this.selectedSeason = option;
            this.manager.getSeason(option)
                .then(ssn => this.niccolgurs = ssn)
        }
    }

    masterChange(option, event?) {
        if (!event || event.source.selected) {
            this.selectedMaster = option;
            this.manager.getNiccolgurs(option)
                .then(ssn => this.niccolgurs = ssn)
        }
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
        } else if (movie === 'caching') {
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
