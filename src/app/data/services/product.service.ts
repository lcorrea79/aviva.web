import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ConfigurationService } from '../../core/services/configuration.service';
import { IProduct } from '../models/product.model';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //------------------------------------------------------------------------
  // Private Fields Section
  //------------------------------------------------------------------------
  private apiUrl = this.configurations.baseUrl + '/v1/Product';
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
  getProduct(id: number) {
    const url = this.apiUrl + '/' + id;
    return this.apiService.get(url);
  }
  //------------------------------------------------------------------------
  createProduct(product: IProduct) {
    const url = this.apiUrl;
    return this.apiService.post(url, product);
  }
  //------------------------------------------------------------------------
  updateProduct(id: number, product: IProduct) {
    const url = this.apiUrl + '/' + id;
    return this.apiService.put(url, product);
  }
  //------------------------------------------------------------------------
  deleteProduct(id: number) {
    const url = this.apiUrl + '/' + id;
    return this.apiService.delete(url);
  }
  
  //------------------------------------------------------------------------
  getAllProducts() {
    const url = this.apiUrl;
    var products = this.apiService.get(url); 
    console.log("Products", products);  
    return  products;
  }
  //------------------------------------------------------------------------
  getProductByNameList(name: string) {
    const url = this.apiUrl + '/name/' + name;
    return this.apiService.get(url);
  }

}
