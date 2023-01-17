import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from 'src/app/util/jwt.service';
import { Offer,JobOneResponse, CreateOffer, OffersResponse, OfferResponse,JobResponse } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';
import { CREATE_OFFER_URL, GET_ALL_OFFERS_COMPANY_URL,GET_OFFERS_PUBLIC_URL,GET_ALL_OFFERS_ADMIN_URL, GET_SEARCH_OFFERS_PUBLIC_URL, GET_OFFER_BY_ID_URL, UPDATE_VIWE_OFFER_URL, REJECT_OFFER_URL, ACCEPT_OFFER_URL } from 'src/config';
import { Status } from 'src/app/interfaces/enums';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  
  headers = new HttpHeaders().set(
    "Authorization", `Bearer ${this.jwtService.getToken()}`
  )
  getOffers(status: Status, pageNumber: number, size: number): Observable<OffersResponse> {
    console.log(`${GET_ALL_OFFERS_COMPANY_URL}?status=${status}&pageNumber=${pageNumber}&size=${size}`);
    return this.http.get<OffersResponse>(`${GET_ALL_OFFERS_COMPANY_URL}?status=${status}&pageNumber=${pageNumber}&size=${size}`, { headers: this.headers })
  }

  createOffer(offer: CreateOffer): Observable<OfferResponse> {
    return this.http.post<OfferResponse>(`${CREATE_OFFER_URL}`, offer, { headers: this.headers })
  }

  getPublicOffers(pageNumber: number, size: number): Observable<JobResponse> {
    return this.http.get<JobResponse>(`${GET_OFFERS_PUBLIC_URL}?pageNumber=${pageNumber}&size=${size}`)
  }

  getPublicOffersByCriteria(pageNumber: number, size: number, title: string, domain: string, location: string): Observable<JobResponse> {
    let query = `${GET_SEARCH_OFFERS_PUBLIC_URL}?pageNumber=${pageNumber}&size=${size}`
    if (title) {
      query += `&title=${title}`
    }
    if (domain) {
      query += `&domain=${domain}`
    }
    if (location) {
      query += `&location=${location}`
    }
    return this.http.get<JobResponse>(query)
  }

  getOfferById(id: number): Observable<JobOneResponse> {
    return this.http.get<JobOneResponse>(`${GET_OFFER_BY_ID_URL}/${id}`)
  }
  
  updateView(id: number): Observable<JobOneResponse> {
    return this.http.put<JobOneResponse>(`${UPDATE_VIWE_OFFER_URL}/${id}`,null)
  }

  getOffersByAdmin(status: Status, pageNumber: number, size: number): Observable<OffersResponse> {
    return this.http.get<OffersResponse>(`${GET_ALL_OFFERS_ADMIN_URL}?status=${status}&pageNumber=${pageNumber}&size=${size}`, { headers: this.headers })
  }

  acceptOffer(id: number): Observable<OfferResponse> {
    return this.http.put<OfferResponse>(`${ACCEPT_OFFER_URL}/${id}`, null, { headers: this.headers })
  }

  rejectOffer(id: number): Observable<OfferResponse> {
    return this.http.put<OfferResponse>(`${REJECT_OFFER_URL}/${id}`, null, { headers: this.headers })
  }



}
