import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsComponent } from './product-details.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { ProductsService } from '../../services/products.service';
import { HttpRoutingService } from '../../services/http-routing.service';
import { ProductDetails } from '../../models/product-details.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
class MockSnackbarService {
  openSnackbar(message: string, action: string, duration?: number, panelClass?: string) { }
}
class MockRouter {
  navigate(url: string) {
    return url
  }
}
class MockProductService {
  messages = new BehaviorSubject<any>({});

  createProduct() {
    return of({
      productDetails: {
        isDeleted: false,
        created: "2024-05-24T13:19:16.900Z",
        modified: "2024-05-24T13:19:16.900Z",
        id: 855,
        name: "Pen",
        description: "Sharp point",
        price: 1200
      }
    });
  }
}

class MockHttpService {

  getProductById(id: string) {
    return of({
      productDetails: {
        id: 850,
        name: "hello",
        description: "12",
        price: 1200,
        isDeleted: false,
        created: "2024-05-24T13:09:13.312Z",
        modified: "2024-05-24T13:09:13.312Z"
      },
      success: true
    });
  }

  updateProduct() {
    return of({
      updateStatus: true,
      success: true
    });
  }
}

class MockActivatedRoute {
  private paramsSubject = new BehaviorSubject<any>({ id: '1', data: 'testData' });
  params = this.paramsSubject.asObservable();
}

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let productService: ProductsService;
  let httpService: HttpRoutingService;
  let router: Router;
  let snackbarService: SnackbarService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterTestingModule,
        FormsModule, HttpClientModule
      ],
      providers: [
        { provide: SnackbarService, useClass: MockSnackbarService },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: HttpRoutingService, useClass: MockHttpService },
        { provide: ProductsService, useClass: MockProductService }
      ]
    });
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
    httpService = TestBed.inject(HttpRoutingService);
    router = TestBed.inject(Router);
    snackbarService = TestBed.inject(SnackbarService);
    let data = component.productsForm = new FormGroup({
      name: new FormControl('Table'),
      price: new FormControl('344440'),
      description: new FormControl('description')
    })
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with product details when route params are present', () => {
    const productDetails: ProductDetails = { id: 1, name: 'Test Product', description: 'Test Description', price: 100 };
    spyOn(httpService, 'getProductById').and.returnValue(of({}));
    component.ngOnInit();
    expect(httpService.getProductById).toHaveBeenCalledWith(1);
    expect(component.productDetails).toEqual(productDetails);
    expect(component.productsForm.value).toEqual(productDetails);
  });

  it('should initialize form with empty values when route params are not present', () => {
    component.paramData.id = '';
    component.ngOnInit();
    expect(component.productsForm.value).toEqual({ name: null, description: null, price: null });
  });

  it('should create product and show success message', () => {
    const formData = { name: 'Test Product', description: 'Test Description', price: 100 };
    component.productsForm.setValue(formData);
    component.onSave();
    expect(productService.createProduct).toHaveBeenCalledWith(formData);
    expect(snackbarService.openSnackbar).toHaveBeenCalledWith('Product Saved successfully', 'Success');
    expect(component.productsForm.value).toEqual({ name: null, description: null, price: null });
  });

  it('should update product and navigate to product list', () => {
    const formData = { id: 12, name: 'Test Product', description: 'Test Description', price: 100 };
    spyOn(httpService, 'updateProduct').and.returnValue(of({}));
    component.updateData = true;
    component.paramData.id = '12';
    component.productsForm.setValue(formData);
    component.onSave();
    expect(httpService.updateProduct).toHaveBeenCalledWith('12', formData);
    expect(snackbarService.openSnackbar).toHaveBeenCalledWith('Product updated Successfully', 'Success');
    expect(router.navigate).toHaveBeenCalledWith(['/app/productList']);
  });


  it('should show warning message when form is invalid', () => {
    component.productsForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
    component.productsForm.setErrors({ invalid: true });
    component.onSave();
    expect(snackbarService.openSnackbar).toHaveBeenCalledWith('Please fill the mantatory field', 'Warning');
  });

  it('should show warning message when form is not dirty during update', () => {
    component.updateData = true;
    component.paramData.id = '1';
    component.onSave();
    expect(snackbarService.openSnackbar).toHaveBeenCalledWith('You have not change any product values', 'Warning', 5000);
  });

  it('should navigate to product list', () => {
    component.onNavigate();
    expect(router.navigate).toHaveBeenCalledWith(['/app/productList']);
  });
});
