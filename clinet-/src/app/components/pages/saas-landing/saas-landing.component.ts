import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-saas-landing',
    templateUrl: './saas-landing.component.html',
    styleUrls: ['./saas-landing.component.scss']
})
export class SaasLandingComponent implements OnInit {

    constructor( private titleService: Title ) {
        this.titleService.setTitle('Kilian - Angular 14 Saas Landing Page');
    }

    ngOnInit() {
    }

}