import {Component, Input, OnInit} from '@angular/core';
import {Niccolgur} from '../../ts/domain';
import {movieTMDBPage, images} from '../../ts/env';
import {StorageService} from '../../services/storage-service.service';
import {NiccolgurManagerService} from '../../services/niccolgur-manager.service';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

    @Input()
    niccolgur: Niccolgur;

    images = images;
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
            .catch(err => {
                this.niccolgur.movie_data = undefined;
                throw err;
            });
        this.manager.getUser(this.niccolgur.master).then(user => this.niccolgur.masterFull = user);
    }

    openMovie = (niccolgur: Niccolgur) =>
        window.open(`${movieTMDBPage}/${niccolgur.movie_id}`, '_blank');

    getImageUrl(niccolgur: Niccolgur): string {
        if (this.config && niccolgur.movie_data) {
            return `${this.config.images.base_url}/w500/${niccolgur.movie_data.poster_path}`;
        } else {
            return 'https://www.artranked.com/images/3b/3be9d9fcc7e4e8f433893ef020168598.jpg';
        }
    }

}
