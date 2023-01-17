import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-digital-marketing',
    templateUrl: './decoration-jardin.component.html',
   // styleUrls: ['./gazon-synthetique.component.scss']
})
export class DecorationJardinComponent implements OnInit {

    constructor( private titleService: Title ) {
        this.titleService.setTitle('Mondo jardine - services Gazon synthetique');
    }

    ngOnInit() {
    }

}