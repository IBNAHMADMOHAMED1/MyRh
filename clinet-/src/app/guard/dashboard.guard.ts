import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { AuthState } from 'src/app/interfaces/interfaces';
import { AccountService } from '../services/account/account.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
   isAuthenticated: boolean;
    whoIsLoggedIn: string;
  authSubscription: Subscription;
  
  

  

constructor(private accountService: AccountService,private router : Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authSubscription = this.accountService.isLoggedIn().subscribe((auth: AuthState) => {
      this.isAuthenticated = auth.isAuthenticated;
      this.whoIsLoggedIn = auth.who;
      });
    if (this.isAuthenticated && this.whoIsLoggedIn === 'agent') {
      return true;
    }
    this.router.navigate(['/']);
    
   
  }
  
}
