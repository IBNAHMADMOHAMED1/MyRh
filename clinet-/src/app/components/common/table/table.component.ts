import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OfferService } from 'src/app/services/offer/offer.service';
import { Offer, OffersResponse } from 'src/app/interfaces/interfaces';
import { Status } from 'src/app/interfaces/enums';


/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
  

export class TableComponent implements OnInit {
  displayedColumns = ['id', 'title', 'domain','salary', 'education_level', 'status', 'location', 'actions'];
  dataSource: MatTableDataSource<Offer>;
  offersData: Offer[];
  offerResponse: OffersResponse;
  showFilter = false;
  showForm = false;
  selectedStatus: "All" | "ACCEPTED" | "REJECTED" | "PENDING" = "All";
  totalItems = 100;
  pageSize = 5;
  pageSizeOptions = [2,5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator; 
  @ViewChild(MatSort) sort: MatSort;

  constructor(private offerService: OfferService) {
  }

  ngOnInit() {
    this.getOffers(Status.All, 0, 10);
  }
  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
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
    this.offerService.getOffers(status, pageNumber, size).subscribe(offers => {
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
}

