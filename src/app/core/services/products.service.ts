import { Injectable } from '@angular/core';
import { HttpRoutingService } from './http-routing.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpService: HttpRoutingService) { }

  message = new BehaviorSubject<any>(null);

  getMessage() {
    this.httpService.getMessage('message.json').subscribe(res => {
      console.log('message:', res);
      this.message.next(res);
    });
  }

  getAllProducts() {
    return this.httpService.getMethod('product');
  }

  createProduct(data: any) {
    return this.httpService.postMethod('product', data);
  }

}
