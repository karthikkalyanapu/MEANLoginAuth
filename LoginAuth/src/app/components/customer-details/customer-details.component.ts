import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {  CustomerDetailsService } from './customer-details.service';

export interface Transaction {
  date: Date;
  amount: number;
  transaction_code: string;
  symbol: string;
  price: string;
  total: string;
}

export interface Customer {
  name: string;
  address: string;
  accounts: string[];
  transactions: { [key: string]: Transaction[] };
}


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})


export class CustomerDetailsComponent implements OnInit {
  transactionsBelow5000: any;  
  distinctProducts: any; 
  columnsToDisplay = ['name', 'address', 'accounts'];
  displayedColumns: string[] = ['date', 'amount', 'transaction_code', 'symbol', 'price', 'total'];
  expandedCustomer: Customer | null = null;
  selectedAccount: number | null = null;
  transactions: Transaction[] = [];
  customers: Customer[] = [];
  showTransationQuery : boolean = false;
  showProductsQuery : boolean = false


  constructor(private auth: AuthService, private router: Router,  private customerService: CustomerDetailsService) { }

  ngOnInit(): void {
    this.fetchActiveCustomers();
  }

  fetchActiveCustomers(): void {
    this.customerService.getActiveCustomers().subscribe(response => {
      this.customers = response.data;
      console.log("this.customers", this.customers);
      
    }, error => {
      console.error('Error fetching customers', error);
    });
  }

  toggleTransactions(customer: Customer, account: number | null, event: Event): void {
    event.stopPropagation(); 

    if (this.expandedCustomer === customer && this.selectedAccount === account) {
      this.expandedCustomer = null; 
      this.selectedAccount = null;
      this.transactions = [];
    } else {
      this.expandedCustomer = customer;
      this.selectedAccount = account;
      if (account !== null) {
        this.fetchTransactions(account);
      }
    }
  }

  fetchTransactions(accountId: number): void {
    this.customerService.getTransactions(accountId).subscribe(transactions => {
      this.transactions = transactions;
    }, error => {
      console.error('Error fetching transactions', error);
    });
  }

  toggleData(type: 'transactions' | 'products') {
    if (type === 'transactions') {
      this.showTransationQuery = !this.showTransationQuery;

      if (this.showTransationQuery && !this.transactionsBelow5000) {
        this.customerService.getTransactionsBelow5000().subscribe(
          data => this.transactionsBelow5000 = data,
          error => console.error(error)
        );
      }
    } else if (type === 'products') {
      this.showProductsQuery = !this.showProductsQuery;
      if (this.showProductsQuery && !this.distinctProducts) {
        this.customerService.getProductsDistinct().subscribe(
          data => this.distinctProducts = data,
          error => console.error(error)
        );
      }
    }
  }

  logout() {
    this.auth.logout()
  }
}
