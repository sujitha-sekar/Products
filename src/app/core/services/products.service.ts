import { Injectable } from '@angular/core';
import { HttpRoutingService } from './http-routing.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpService: HttpRoutingService) { }
  /**
   * BehaviorSubject to hold and share message data.
   */
  message = new BehaviorSubject<any>(null);
  /**
   * Fetches error messages from a JSON file and updates the message BehaviorSubject.
   */
  getMessage() {
    this.httpService.getMessage('message.json').subscribe(res => {
      this.message.next(res);
    });
  }
  /**
   * Fetches all products from the server.
   * @returns An Observable containing the list of products.
   */
  getAllProducts() {
    return this.httpService.getMethod('product');
  }
  /**
   * Creates a new product by sending the product data to the server.
   * @param data The data of the product to be created.
   * @returns An Observable containing the response from the server.
   */
  createProduct(data: any) {
    return this.httpService.postMethod('product', data);
  }

}
