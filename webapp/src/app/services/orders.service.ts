import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from '../types/order';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  http=inject(HttpClient);

  constructor() { }

  addOrder(order:Order){
    return this.http.post(environment.apiUrl + '/customer/order',order);

  }
}
