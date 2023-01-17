import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-digital-marketing',
    templateUrl: './pergola-bioclimatique.component.html',
   // styleUrls: ['./gazon-synthetique.component.scss']
})
export class PergolaBioclimatiqueComponent implements OnInit {

    constructor( private titleService: Title ) {
        this.titleService.setTitle('Mondo jardine - services pergola bioclimatique');
    }

    ngOnInit() {
    }

}