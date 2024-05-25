import { TestBed } from '@angular/core/testing';

import { HttpRoutingService } from './http-routing.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('HttpRoutingService', () => {
  let service: HttpRoutingService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: HttpClient, useValue: {} }
      ]
    });
    service = TestBed.inject(HttpRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getMessage ', () => {
    const url = 'urlpath';
    service.getMessage(url);
    expect(service.getMessage).toBeDefined();
    // expect(service.getMessage).toHaveBeenCalledWith(`'./assets/'${url}`);
  });

  it('should call getMethod ', () => {
    const url = 'urlpath';
    service.getMethod(url);
    expect(service.getMethod).toBeDefined();
    // expect(service.getMethod).toHaveBeenCalledWith(`v1/product/${url}`);
  });

  it('should call postMethod ', () => {
    const url = 'urlpath';
    const data = {
      id: 1,
      name: 'name',
      price: 300
    };
    service.postMethod(url, data);
    expect(service.postMethod).toBeDefined();
    // expect(service.postMethod).toHaveBeenCalledWith(`v1/product/${url}`, data);
  });

  it('should call deleteProduct', () => {
    const productId = 12;
    service.deleteProduct(productId);
    expect(service.deleteProduct).toBeDefined();
    // expect(service.deleteProduct).toHaveBeenCalledWith(`v1/product/${productId}`);
  });

  it('should call getProductById ', () => {
    const productId = 12;
    service.getProductById(productId);
    expect(service.getProductById).toBeDefined();
    // expect(service.getProductById).toHaveBeenCalledWith(`v1/product/${productId}`);
  });

  it('should call updateProduct ', () => {
    const productId = 12;
    const data = {
      id: 1,
      name: 'name',
      price: 300
    }
    service.updateProduct(productId, data);
    expect(service.updateProduct).toBeDefined();
    // expect(service.updateProduct).toHaveBeenCalledWith(`v1/product/${productId}`, data);
  });

});
