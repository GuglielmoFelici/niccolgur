import {Component, Input, OnInit} from '@angular/core';
import {Niccolgur} from '../../ts/domain';
import {StorageService} from '../../services/storage-service.service';
import {NiccolgurManagerService} from '../../services/niccolgur-manager.service';
import {movieTMDBPage, profile_pics} from 'src/environments/environment';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

    @Input()
    niccolgur: Niccolgur;

    images = profile_pics;
    config;


    constructor(private storage: StorageService,
                private manager: NiccolgurManagerService) {
    }

    ngOnInit() {
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

    openMovie = (niccolgur: Niccolgur) =>
        window.open(`${movieTMDBPage}/${niccolgur.movie_id}`, '_blank');

    getImageUrl(niccolgur: Niccolgur): string {
        if (this.config && niccolgur.movie_data && niccolgur.movie_data.poster_path) {
            return `${this.config.images.secure_base_url}/w500/${niccolgur.movie_data.poster_path}`;
        } else {
            return 'https://coolbackgrounds.io/images/backgrounds/white/white-radial-gradient-a5802da1.jpg';
        }
    }

}
