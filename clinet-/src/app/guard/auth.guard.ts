import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from '../services/account/account.service';
import { Subscription } from 'rxjs';
import { AuthState } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';
@Injectable({
providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isAuthenticated: boolean;
  whoIsLoggedIn: string;
  authSubscription: Subscription;
  LOGIN_URL = 'login';
  RRGISTER_URL = 'signup';


constructor(private accountService: AccountService,private router : Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.authSubscription = this.accountService.isLoggedIn().subscribe((auth: AuthState) => {
      this.whoIsLoggedIn = auth.who;
      this.isAuthenticated = auth.isAuthenticated;
    });
      if (route.url[0].path === this.LOGIN_URL || route.url[0].path === this.RRGISTER_URL) {
        if (this.isAuthenticated) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }
    if (this.isAuthenticated) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
}
}