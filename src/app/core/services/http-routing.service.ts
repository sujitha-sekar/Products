import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRoutingService {

  constructor(private httpRouting: HttpClient) { }

  apiUrl: string = environment.apiUrl;

  getMethod(url: string) {
    return this.httpRouting.get(this.apiUrl + 'v1/' + url);
  }

  postMethod(url: any, data: any) {
    return this.httpRouting.post(this.apiUrl + 'v1/' + url, data)
  }

  deleteProduct(productId: string): Observable<any> {
    return this.httpRouting.delete(this.apiUrl + 'v1/product/' + productId);
  }

  getProductById(productId: string): Observable<any> {
    return this.httpRouting.get(this.apiUrl + 'v1/product/' + productId);
  }

  updateProduct(url:any, data: any) {
    return this.httpRouting.put(this.apiUrl + 'v1/product', data,{
      params : {id : url}
    });
  }
}
