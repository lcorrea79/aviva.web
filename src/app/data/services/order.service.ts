import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ConfigurationService } from '../../core/services/configuration.service';
import { IOrder, IOrderRequest } from '../models/order.model';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  //------------------------------------------------------------------------
  // Private Fields Section
  //------------------------------------------------------------------------
  private apiUrl = this.configurations.baseUrl + '/v1/order';
  //------------------------------------------------------------------------
  // Constructor Method Section
  //------------------------------------------------------------------------
  constructor(
    private apiService: ApiService<any>,
    private configurations: ConfigurationService,
  ) { }
  //------------------------------------------------------------------------
  // Public Methods Section
  //------------------------------------------------------------------------
  getOrder(id: string) {
    const url = this.apiUrl + '/' + id;
    return this.apiService.get(url);
  }
  //------------------------------------------------------------------------
  createOrder(order: IOrderRequest) {
    const url = this.apiUrl;
    return this.apiService.post(url, order);
  }
  //------------------------------------------------------------------------
  cancelOrder(id: string) {
    const url = this.apiUrl + '/cancel/' + id;
    return this.apiService.put(url, {});
  }
  //------------------------------------------------------------------------
  payOrder(id: string) {
    const url = this.apiUrl + '/pay/' + id;
    return this.apiService.put(url, {});
  }
  
  //------------------------------------------------------------------------
  getAllOrders() {
    const url = this.apiUrl;
    return this.apiService.get(url);
  } 

}
