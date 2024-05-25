import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsComponent } from './product-details.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { ProductsService } from '../../services/products.service';
import { HttpRoutingService } from '../../services/http-routing.service';
// import { spyOn } from 'jasmine';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let productService: ProductsService;
  let httpService: HttpRoutingService;
  let router: Router;
  let snackbarService: SnackbarService;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', ['createProduct']);
    const httpServiceSpy = jasmine.createSpyObj('HttpRoutingService', ['getProductById', 'updateProduct']);
    const snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', ['openSnackbar']);

    await TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy },
        { provide: HttpRoutingService, useValue: httpServiceSpy },
        { provide: ActivatedRoute, useValue: { params: of({ id: '1', data: 'testData' }) } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: SnackbarService, useValue: snackbarServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
    httpService = TestBed.inject(HttpRoutingService);
    router = TestBed.inject(Router);
    snackbarService = TestBed.inject(SnackbarService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with product details when route params are present', () => {
    const productDetails = { id: '1', name: 'Test Product', description: 'Test Description', price: 100 };
    // httpService.getProductById.and.returnValue(of({ productDetails }));
    spyOn(httpService, 'getProductById').and.returnValue(of({}));

    component.ngOnInit();
    expect(httpService.getProductById).toHaveBeenCalledWith('1');
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
    // spyOn(httpService, 'createProduct').and.returnValue(of({}));
    component.productsForm.setValue(formData);
    component.onSave();
    expect(productService.createProduct).toHaveBeenCalledWith(formData);
    expect(snackbarService.openSnackbar).toHaveBeenCalledWith('Product Saved successfully', 'Success');
    expect(component.productsForm.value).toEqual({ name: null, description: null, price: null });
  });

  it('should update product and navigate to product list', () => {
    const formData = { id: '1', name: 'Test Product', description: 'Test Description', price: 100 };
    spyOn(httpService, 'updateProduct').and.returnValue(of({}));
    component.updateData = true;
    component.paramData.id = '1';
    component.productsForm.setValue(formData);
    component.onSave();
    expect(httpService.updateProduct).toHaveBeenCalledWith('1', formData);
    expect(snackbarService.openSnackbar).toHaveBeenCalledWith('Product updated Successfully', 'Success');
    expect(router.navigate).toHaveBeenCalledWith(['/app/productList']);
  });

  it('should show warning message when form is invalid', () => {
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
