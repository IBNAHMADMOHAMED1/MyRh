import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from '../services/account/account.service';
import { Subscription } from 'rxjs';
import { AuthState } from 'src/app/interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class CreateOfferGuard implements CanActivate {
    isAuthenticated: boolean;
    whoIsLoggedIn: string;
    authSubscription: Subscription;

  constructor(private accountService: AccountService) {
    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.authSubscription = this.accountService.isLoggedIn().subscribe((auth: AuthState) => {
      this.isAuthenticated = auth.isAuthenticated;
      this.whoIsLoggedIn = auth.who;
    });
    if (this.isAuthenticated && this.whoIsLoggedIn === 'company') {
      return true;
    }
    return false;
  }
}
