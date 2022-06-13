import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Niccolgur, User} from "../../../../ts/domain";
import {StorageService} from "../../../../services/storage-service.service";
import {NiccolgurManagerService} from "../../../../services/niccolgur-manager.service";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {NiccuscarVote} from "../niccuscar.component";


@Component({
    selector: 'app-niccuscar-movie-card',
    templateUrl: './niccuscar-movie-card.component.html',
    styleUrls: ['./niccuscar-movie-card.component.css']
})
export class NiccuscarMovieCardComponent implements OnInit {

    @Input() niccolgur: Niccolgur
    config;
    @Input() votes: { [key: string] : NiccuscarVote};
    @Output() votesChange = new EventEmitter<{ [key: string] : NiccuscarVote}>();

    constructor(private storage: StorageService, private manager: NiccolgurManagerService) {
    }

    ngOnInit(): void {
        this.storage.config.subscribe(config => this.config = config);
        this.manager.getMovie(this.niccolgur.movie_id, 'it').then(
            movie => {
                this.niccolgur.movie_data = movie;
                console.log(this.niccolgur.movie_data);
                return this.manager.getTagline(this.niccolgur.movie_id);
            })
            .then(
                tagline => this.niccolgur.movie_data.tagline = tagline
            )
            .catch(_ => {
                this.niccolgur.movie_data = {title: 'C\'è stato un errore'};
            });
        this.manager.getUser(this.niccolgur.master).then(user => {
            this.niccolgur.masterFull = user;
        });
    }

    votesAsArray(typeFilter? : 'BINARY' | 'TOP5' | 'MASTER') {
        return Object.entries(this.votes).map(val => val[1]).filter(v => v.type === typeFilter)
    }

    getImageUrl(niccolgur: Niccolgur): string {
        if (this.config && niccolgur.movie_data && niccolgur.movie_data.poster_path) {
            return `${this.config.images.secure_base_url}/w500/${niccolgur.movie_data.poster_path}`;
        } else {
            return 'https://coolbackgrounds.io/images/backgrounds/white/white-radial-gradient-a5802da1.jpg';
        }
    }

    topFiveChange(key: string, i: number) {
        this.votes[key].values[i] = this.niccolgur
        this.votesChange.emit(this.votes)
    }

    masterChange(key: string, $event: MatCheckboxChange) {
        if ($event.checked) {
            this.votes[key].masterValues[this.niccolgur.master] = this.niccolgur
        } else {
            this.votes[key].masterValues[this.niccolgur.master] = undefined
        }
        this.votesChange.emit(this.votes)
    }

    checkChange(key: string, $event: MatCheckboxChange) {
        if ($event.checked) {
            this.votes[key].values[0] = this.niccolgur
        } else {
            this.votes[key].values = []
        }
        this.votesChange.emit(this.votes)
    }

}
