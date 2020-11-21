import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoginGuard implements CanActivate {
  constructor(private authService: FirebaseService, private router: Router) {
  }
   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isUserAuthenticated().then( async (user) =>{
        if(!user) return true;
        const tokenResult = await user.getIdTokenResult();
        const valid = (tokenResult.claims && tokenResult.claims.user);
        if(valid){
          this.router.navigate(['/']);
          return false;
        }
        return true ;
      });

      }


    }



