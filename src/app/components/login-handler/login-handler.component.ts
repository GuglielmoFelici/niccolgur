import { Component, OnInit } from '@angular/core';
import { assetsImages } from "../../../environments/environment";
import { Router } from "@angular/router";
import { StorageService } from "../../services/storage-service.service";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-login-handler',
    templateUrl: './login-handler.component.html',
    styleUrls: ['./login-handler.component.css']
})
export class LoginHandlerComponent implements OnInit {

    constructor(private router: Router,
        private storage: StorageService,
        private auth: AuthService) {
    }

    ngOnInit(): void {

    }


    getLoggedUser = () => this.storage.loggedUser

    getLoginImage = () => this.isUserLoggedIn()
        ? this.storage.loggedUser && this.storage.loggedUser.img
        : assetsImages + '/login.png'

    isUserLoggedIn = () => this.storage.isLoggedIn

    login() {
        this.router.navigate(
            ['/login'],
            {
                state: {
                    previous: this.router.url,
                }
            })
    }

    profilo() {
        this.router.navigate([`/users/${this.getLoggedUser() && this.getLoggedUser().id}`])
    }

    logout() {
        this.auth.logout();
    }

}
