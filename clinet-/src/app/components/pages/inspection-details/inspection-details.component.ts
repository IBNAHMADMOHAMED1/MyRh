import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-details',
  templateUrl: './inspection-details.component.html',
  styleUrls: ['./inspection-details.component.scss']
})
export class InspectionDetailsComponent implements OnInit {

    constructor( private titleService: Title ) {
        this.titleService.setTitle('Wim | Prestations et services');
    }

  ngOnInit() {
      
    }
}
