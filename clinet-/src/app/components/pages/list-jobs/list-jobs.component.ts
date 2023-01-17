import { Component, OnInit } from '@angular/core';
import { Job, Localisation } from 'src/app/interfaces/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OfferService } from 'src/app/services/offer/offer.service';
import { LOCALISATIONS } from 'src/app/util/constante';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.scss'],
  
})
export class ListJobsComponent implements OnInit {
  offerForm: FormGroup;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  domains = ['IT', 'RH', 'Marketing', 'Finance', 'HR', 'Communication', 'Sales', 'Legal'];
  localisations: Localisation[] = LOCALISATIONS
  pages = [1, 2, 3];
  jobs: Job[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private offerService: OfferService,  private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = params.page ? params.page : 0;
      this.itemsPerPage = params.size ? params.size : 6;
      this.getJobs(this.currentPage, this.itemsPerPage);
    })
    this.offerForm = this.formBuilder.group({
      title: ['', [Validators.minLength(2)]],
      domain: [''],
      localisation: [''],
    });
  }

  goToJobDetails(id: number) {
    this.router.navigate(['/job-details', id]);
  }

  getJobs(pageNumber: number, size: number) {
    this.offerService.getPublicOffers(pageNumber, size).subscribe((response) => {
      this.jobs = response.data.content;
      console.log(response.data);
    
    })
  }
  previousPage() {
    if (this.currentPage === 0) {
      return;
    }  
    this.currentPage--;
    this.getJobs(this.currentPage, this.itemsPerPage);
  }

  nextPage() {
    this.currentPage++;
    this.getJobs(this.currentPage, this.itemsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getJobs(this.currentPage, this.itemsPerPage);
  }

  onSubmit() {
    if (this.offerForm.invalid) {
      return;
    }

    this.offerService.getPublicOffersByCriteria(this.currentPage, this.itemsPerPage, this.offerForm.value.title, this.offerForm.value.domain, this.offerForm.value.localisation).subscribe((response) => {
      this.jobs = response.data.content;
    })
  }
}
