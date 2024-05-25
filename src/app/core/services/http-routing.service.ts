import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRoutingService {

  constructor(private httpRouting: HttpClient) { }
  /**
   * The base URL for API requests.
   */
  apiUrl: string = environment.apiUrl;

  /**
   * Method used to get error message from a JSON file.
   * @param url The URL path to the JSON file.
   * @returns An Observable containing the error messages.
   */
  getMessage(url: any): Observable<any> {
    return this.httpRouting.get('./assets/' + url);
  }

  /**
   * Method used to get data from the table.
   * @param url The URL path for the API endpoint.
   * @returns An Observable containing the data from the table.
   */
  getMethod(url: string): Observable<any> {
    return this.httpRouting.get(this.apiUrl + 'v1/' + url);
  }

  /**
   * Method used to post data to the API.
   * @param url The URL path for the API endpoint.
   * @param data The data to be posted to the API.
   * @returns An Observable containing the response from the API.
   */
  postMethod(url: string, data: any): Observable<any> {
    return this.httpRouting.post(this.apiUrl + 'v1/' + url, data);
  }

  /**
   * Method used to delete a product.
   * @param productId The ID of the product to be deleted.
   * @returns An Observable containing the response from the API.
   */
  deleteProduct(productId: number): Observable<any> {
    return this.httpRouting.delete(this.apiUrl + 'v1/product/' + productId);
  }

  /**
   * Method used to get a product by its ID.
   * @param productId The ID of the product to retrieve.
   * @returns An Observable containing the product data.
   */
  getProductById(productId: any): Observable<any> {
    return this.httpRouting.get(this.apiUrl + 'v1/product/' + productId);
  }

  /**
   * Method used to update a product.
   * @param url The ID of the product to update.
   * @param data The new data for the product.
   * @returns An Observable containing the response from the API.
   */
  updateProduct(url: any, data: any): Observable<any> {
    return this.httpRouting.put(this.apiUrl + 'v1/product', data, {
      params: { id: url }
    });
  }
}
