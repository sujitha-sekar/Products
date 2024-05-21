import { Injectable } from '@angular/core';
import { HttpRoutingService } from './http-routing.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpService: HttpRoutingService) { }

  getAllProducts() {
    return this.httpService.getMethod('product');
  }
}
