import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-software-landing',
  templateUrl: './software-landing.component.html',
  styleUrls: ['./software-landing.component.scss']
})
export class SoftwareLandingComponent implements OnInit {

    constructor( private titleService: Title ) {
        this.titleService.setTitle('Kilian - Angular 14 Multipurpose Landing Page Template');
    }

    ngOnInit() {
    }

}
