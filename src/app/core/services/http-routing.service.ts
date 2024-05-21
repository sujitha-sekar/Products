import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRoutingService {

  constructor(private httpRouting: HttpClient) {
    console.log('API URL:', this.apiUrl); // Log the API URL
  }

  apiUrl: string = environment.apiUrl;

  getMethod(url: string) {
    return this.httpRouting.get(this.apiUrl + 'v1/' + url);
  }

  postMethod(url: any, data: any) {
    return this.httpRouting.post(this.apiUrl + 'v1/' + url, data)
  }

  getList() {
    return this.httpRouting.get(this.apiUrl)
  }
}
