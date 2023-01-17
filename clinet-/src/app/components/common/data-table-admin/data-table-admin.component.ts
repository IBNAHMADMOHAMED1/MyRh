import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OfferService } from 'src/app/services/offer/offer.service';
import { Offer, OffersResponse } from 'src/app/interfaces/interfaces';
import { Status } from 'src/app/interfaces/enums';


@Component({
  selector: 'app-data-table-admin',
  templateUrl: './data-table-admin.component.html',
  styleUrls: ['./data-table-admin.component.scss']
})
export class DataTableAdminComponent implements OnInit {
 displayedColumns = ['id', 'title', 'domain','salary', 'education_level', 'status', 'location', 'options','actions' ];
  dataSource: MatTableDataSource<Offer>;
  offersData: Offer[];
  offerResponse: OffersResponse;
  showFilter = false;
  showForm = false;
  selectedStatus: "All" | "ACCEPTED" | "REJECTED" | "PENDING" = "All";
  totalItems = 100;
  pageSize = 5;
  pageSizeOptions = [2, 5, 10, 25, 100];
  isSuccess = false;
  alterMessage: string = null;
  alertType: string;

  @ViewChild(MatPaginator) paginator: MatPaginator; 
  @ViewChild(MatSort) sort: MatSort;

  constructor(private offerService: OfferService) {
  }

  ngOnInit() {
    this.getOffers(Status.All, 0, 10);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applySearch(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  filterData() {
    const status = this.selectedStatus;
    let statusEnum: Status;
    switch (status) {
      case 'ACCEPTED':
        statusEnum = Status.ACCEPTED;
        break;
      case 'REJECTED':
        statusEnum = Status.REJECTED;
        break;
      case 'PENDING':
        statusEnum = Status.PENDING;
        break;
    }

    this.getOffers(statusEnum, 0, 10);
    this.showFilter = false;
  }


  getColor(status: Status) {
    switch (status) {
      case Status.ACCEPTED:
        return 'green';
      case Status.REJECTED:
        return 'red';
      case Status.PENDING:
        return 'orange';
      case Status.All:
        return 'blue';
    }
  }
  refreshTable() {
    this.showForm = false;
    this.pageSize = 5;
    this.getOffers(Status.All, 0, 10);
  }


  getOffers(status: Status, pageNumber: number, size: number) {
    this.offerService.getOffersByAdmin(status, pageNumber, size).subscribe(offers => {
      console.log(offers);
      this.offerResponse = offers;
      this.offersData = this.offerResponse.data.content;
      // console.log(this.offersData);
      this.dataSource = new MatTableDataSource(this.offersData);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
    })
  }

  onPageChange(event) {
    console.log(event);
    this.getOffers(Status.All, event.pageIndex, event.pageSize);
  }
  acceptOffer(id: number) {
    const isOk = confirm("Are you sure you want to accept this offer?");
    if (isOk) {
      this.offerService.acceptOffer(id).subscribe(res => {
        this.alertOptions(true, "Offer is accepted", 'success')
        this.refreshTable();
      }
      , err => {
          this.alertOptions(true, "Offer is not accepted", 'danger')
        });
    }
    else {
      this.alertOptions(true, "Offer is not accepted", 'warning')
    }
  }
  rejectOffer(id: number) {
    const isOk = confirm("Are you sure you want to reject this offer?");
    if (isOk) {
      this.offerService.rejectOffer(id).subscribe(res => {
        this.alertOptions(true, "Offer is rejected", 'success')
        this.refreshTable();
      }
      , err => {
          this.alertOptions(true, "Offer is not rejected", 'danger')
        });
    }
    else {
      this.alertOptions(true, "Offer is not rejected", 'warning')
    }
    
  }

  closeAlert() {
    setTimeout(() => {
      this.isSuccess = false;
      this.alterMessage = null;
    }
      , 3000);
  }

  alertOptions(isSuccess: boolean, alterMessage: string, alertType: string): void {
    this.isSuccess = isSuccess;
    this.alterMessage = alterMessage;
    this.alertType = alertType;
    this.closeAlert();
  }
    
}

