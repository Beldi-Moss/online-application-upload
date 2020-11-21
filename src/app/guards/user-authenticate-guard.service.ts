import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticateGuard implements CanActivate {
  constructor(private authService: FirebaseService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isUserAuthenticated().then((user) => {
        if ( user === null ) {
          this.router.navigate(['/user/welcome-user']);
          return false;
        }
        user.getIdToken(true);
        return user.getIdTokenResult().then((rs: any) => {
          if (user) {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }).catch((err) => false);
  })

}
}
