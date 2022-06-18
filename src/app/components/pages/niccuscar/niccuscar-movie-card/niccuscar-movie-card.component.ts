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

    votesAsArray(typeFilter? : 'TOP5' | 'MASTER') {
        return Object.entries(this.votes).map(val => val[1]).filter(v => v.type === typeFilter)
    }

    getImageUrl(niccolgur: Niccolgur): string {
        if (this.config && niccolgur.movie_data && niccolgur.movie_data.poster_path) {
            return `${this.config.images.secure_base_url}/w500/${niccolgur.movie_data.poster_path}`;
        } else {
            return 'https://coolbackgrounds.io/images/backgrounds/white/white-radial-gradient-a5802da1.jpg';
        }
    }


    isCandidate(key:string, niccolgur: Niccolgur) {
        return this.votes[key].candidates.includes(niccolgur)
    }

    addOrRemoveCandidate(key:string, niccolgur: Niccolgur, add: boolean) {
        if (add) {
            if (!this.votes[key].candidates.includes(niccolgur) ) {
                this.votes[key].candidates.push(niccolgur)
            }
        } else {
            this.votes[key].candidates = this.votes[key].candidates.filter(n => n !== niccolgur)
        }
        this.votesChange.emit(this.votes)
    }

    isMasterCandidate(key:string, master: string, niccolgur: Niccolgur) {
        return this.votes[key].masterCandidates[master]?.includes(niccolgur)
    }

    addOrRemoveMasterCandidate(key:string, master: string, niccolgur: Niccolgur, add: boolean) {
        // bruttina questa logica ma per ora va bene
        if (add) {
            if (this.votes[key].masterCandidates[master] && !this.votes[key].masterCandidates[master].includes(niccolgur) ) {
                this.votes[key].masterCandidates[master].push(niccolgur)
            } else {
                this.votes[key].masterCandidates[master] = [niccolgur]
            }
        } else {
            this.votes[key].masterCandidates[master] = this.votes[key].masterCandidates[master].filter(n => n !== niccolgur)
        }
        this.votesChange.emit(this.votes)
    }
}
