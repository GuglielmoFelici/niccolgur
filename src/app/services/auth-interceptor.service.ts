import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        return next.handle(
            token
                ? request.clone({
                    headers: request.headers.set("Authorization", `Token ${token}` )
                })
                : request
        );
    }
}
