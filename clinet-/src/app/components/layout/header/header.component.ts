import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { Subscription } from 'rxjs';
import { AuthState } from 'src/app/interfaces/interfaces';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    isAuthenticated: boolean;
    whoIsLoggedIn: string;
    authSubscription: Subscription;

    constructor(
        private router: Router,
        private accountService: AccountService
    ) { 
        this.authSubscription = this.accountService.isLoggedIn().subscribe((auth: AuthState) => {
            this.isAuthenticated = auth.isAuthenticated;
            this.whoIsLoggedIn = auth.who;
        })
        console.log(this.whoIsLoggedIn);
        
        
    }
    
    ngOnInit() {
    }

    logout() {
        this.accountService.logout();
        this.isAuthenticated = false;
        this.whoIsLoggedIn = null;
        this.router.navigate(['/']);
    }

}
