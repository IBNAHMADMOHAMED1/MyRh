import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'curage-details',
  templateUrl: './curage-details.componen.html',
  styleUrls: ['./curage-details.componen.scss']
})
export class CurageDetailsComponent implements OnInit {

    constructor( private titleService: Title ) {
        this.titleService.setTitle('Wim | Prestations et services');
    }

  ngOnInit() {
      
    }
}
