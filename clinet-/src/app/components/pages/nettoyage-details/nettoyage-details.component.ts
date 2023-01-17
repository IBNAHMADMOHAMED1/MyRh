import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'nettoyage-details',
  templateUrl: './nettoyage-details.component.html',
  styleUrls: ['./nettoyage-details.component.scss']
})
export class NettoyageDetailsComponent implements OnInit {

    constructor( private titleService: Title ) {
        this.titleService.setTitle('Wim | Prestations et services');
    }

  ngOnInit() {
      
    }
}
