import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {
    private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getActiveCustomers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/customer`);
  }

  getTransactions(accountId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/transactions/${accountId}`);
  }

  getTransactionsBelow5000(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/transationsBelow5000`);
  }

  getProductsDistinct(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/distinct-products`);
  }

}
