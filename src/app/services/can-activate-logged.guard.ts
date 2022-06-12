import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {StorageService} from "./storage-service.service";

@Injectable({
  providedIn: 'root'
})
export class CanActivateLoggedGuard implements CanActivate {

    constructor(private router:Router,
                private storage: StorageService) {
    }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.storage.isLoggedIn ? true : this.router.createUrlTree(['/login'])
  }

}
