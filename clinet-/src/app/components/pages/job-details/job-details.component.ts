import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/interfaces/interfaces';
import { ActivatedRoute,Router } from '@angular/router';
import { OfferService } from 'src/app/services/offer/offer.service';
import { MatDialog } from '@angular/material/dialog';
import { JobModalComponent } from '../../common/job-modal/job-modal.component';
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  job: Job;
  id: number;
  isNontFound = false;
  isOpen = false;

  constructor(private offerService: OfferService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { }
  
  ngOnInit(): void {
     this.route.params.subscribe((params) => {
      this.id = params.id;
     })
      this.getJobDetails(this.id);
   
  }
   openModal(): void {
    this.isOpen = true;
    const dialogRef = this.dialog.open(JobModalComponent, { 
      data: this.job
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isOpen = false;     
      this.updateViewOffer();
    });
   }
  
  updateViewOffer(): void {
    this.offerService.updateView(this.job.id).subscribe((response) => {
      console.log(response);
      if (!response.success) 
        return;
      this.getJobDetails(this.id);
    })
  }
  getJobDetails(id: number) {
    this.offerService.getOfferById(id).
        subscribe((response) => {
          
          if (!response.success) {
            this.isNontFound = true;
            return;
          }
          this.job = response.data;
          console.log(response.data);
        })
  }

}
