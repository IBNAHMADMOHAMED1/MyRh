import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-payment-processing',
    templateUrl: './payment-processing.component.html',
    styleUrls: ['./payment-processing.component.scss']
})
export class PaymentProcessingComponent implements OnInit {

    constructor( private titleService: Title ) {
        this.titleService.setTitle('Kilian - Angular 14 Payment Processing Landing Page');
    }

    ngOnInit() {
    }
}