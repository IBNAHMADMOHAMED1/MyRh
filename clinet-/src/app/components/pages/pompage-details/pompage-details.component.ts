import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pompage-details',
  templateUrl: './pompage-details.componen.html',
  styleUrls: ['./pompage-details.componen.scss']
})
export class PompageDetailsComponent implements OnInit {

    constructor( private titleService: Title ) {
        this.titleService.setTitle("Wim Btp | Pour des prestations de Qualité, d'efficience et de confiance.");
    }

  ngOnInit() {
      
    }
}
