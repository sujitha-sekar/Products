import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpRoutingService } from './http-routing.service';
import { of } from 'rxjs';

class MockHttpService {
  getAllProducts() {
    return of({})
  }
}

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        { provide: HttpRoutingService, useClass: MockHttpService }
      ]
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update message BehaviorSubject with the received message', () => {
    const testMessage = { text: 'Test message' };
    const nextSpy = spyOn(service.message, 'next').and.callThrough();
    service.getMessage();
    const req = httpMock.expectOne('message.json');
    expect(req.request.method).toBe('GET');
    req.flush(testMessage);
    expect(nextSpy).toHaveBeenCalledWith(testMessage);
  });


  it('should return a list of products when getAllProducts is called', () => {
    const products = service.getAllProducts();
    expect(Array.isArray(products)).toBe(true);
  });

  it('should create a new product when createProduct is called with valid data', () => {
    const data = {
      id: 1,
      name: 'product name',
      price: 200
    };
    const createdProduct = service.createProduct(data);
    expect(createdProduct).toBeDefined();
  });


});
