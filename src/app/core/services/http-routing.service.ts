import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpRoutingService {

  constructor(private httpRouting: HttpClient) { }

  apiUrl: string = 'https://api.restful-api.dev/'

  getMethod(url: string) {
    return this.httpRouting.get(this.apiUrl + url);
  }

  postMethod(url: any, data: any) {
    return this.httpRouting.post(this.apiUrl + url, data)
  }
}
