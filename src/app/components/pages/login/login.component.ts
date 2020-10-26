import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username: string;
    pw: string;

    constructor(private service: AuthService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    doLogin() {
        this.service.login(this.username, this.pw).subscribe(
            (_) => this.router.navigate([
                history.state.previous
                    ? history.state.previous
                    : ''
            ])
        )
    }

}
