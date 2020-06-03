import {Component, Input, OnInit} from '@angular/core';
import {Niccolgur} from '../../ts/domain';
import {StorageService} from '../../services/storage-service.service';
import {NiccolgurManagerService} from '../../services/niccolgur-manager.service';
import {images, movieTMDBPage} from 'src/environments/environment';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

    @Input()
    niccolgur: Niccolgur;
    randomSlur = '';

    images = images;
    config;

    what = [
        'leso',
        'down',
        'frocio',
        'dumb',
        'retarded',
        'trash',
        'napoletano',

    ];
    where = [
        'in cannula',
        'in culo',
        'in capa',
        'nel cranio',
        'nell\'anima',
        'dentro',
        'sempre e comunque',
        ', ahimè',
    ];

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
                this.niccolgur.movie_data = {title: 'C\'è stato un errore del porco dio'};
            });
        this.manager.getUser(this.niccolgur.master).then(user => {
            this.niccolgur.masterFull = user;
            this.randomSlur = this.niccolgur.masterFull.nickname + ' è ' + this.what[Math.round(Math.random()*(this.what.length-1))] + ' ' + this.where[Math.round(Math.random()*(this.what.length-1))]
        });
    }

    openMovie = (niccolgur: Niccolgur) =>
        window.open(`${movieTMDBPage}/${niccolgur.movie_id}`, '_blank');

    getImageUrl(niccolgur: Niccolgur): string {
        if (this.config && niccolgur.movie_data && niccolgur.movie_data.poster_path) {
            return `${this.config.images.base_url}/w500/${niccolgur.movie_data.poster_path}`;
        } else {
            return 'https://www.artranked.com/images/3b/3be9d9fcc7e4e8f433893ef020168598.jpg';
        }
    }

}
