import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {StorageService, TOKEN_KEY, USER_KEY} from "../../../services/storage-service.service";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username: string;
    pw: string;
    store: boolean;
    error = '';

    constructor(private service: AuthService,
                private router: Router,
                private storage: StorageService) {
    }

    ngOnInit(): void {
    }

    doLogin() {
        this.service.login(this.username, this.pw, this.store).subscribe(
            _ => {
                this.router.navigate([
                    history.state.previous
                        ? history.state.previous
                        : ''
                ])
            },
            err => this.error = err.status === 400 ? 'Username e/o password errati' : 'Errore sconosciuto'
        )
    }

    toggleStore(change: MatCheckboxChange) {
        this.store = change.checked
    }
}
