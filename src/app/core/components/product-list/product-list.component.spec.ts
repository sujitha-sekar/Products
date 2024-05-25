import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { DialogService } from '../../../shared/services/dialog.service';
import { of, throwError } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { HttpRoutingService } from '../../services/http-routing.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

let result: boolean;
class MockDialogService {
  openConfirmationDialog(message: string) {
    return {
      afterClosed: () => of(true) // Return a mock Observable<boolean>
    };
  }
}
class MockRouter {
  navigate(url: any) {
    return url;
  }
}

class MockProductService {
  getAllProducts() {
    return of({})
  }
}

class MockHttpService {
  deleteProduct(id: number) {
    return of({ success: true });
  }
}
class MockSnackbarService {
  openSnackbar(message: string, action: string, duration?: number) { }
}
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let dialogService: MockDialogService;
  let productService: MockProductService;
  let httpService: MockHttpService;
  let router: MockRouter;
  let snackbarService: MockSnackbarService;
  let result: boolean;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatPaginatorModule, MatTableModule, BrowserAnimationsModule,
        MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule,
      ],
      declarations: [ProductListComponent],
      providers: [
        { provide: SnackbarService, useClass: MockSnackbarService },
        { provide: DialogService, useClass: MockDialogService },
        { provide: Router, useClass: MockRouter },
        { provide: ProductsService, useClass: MockProductService },
        { provide: HttpRoutingService, useClass: MockHttpService }
      ]
    });
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogService = TestBed.inject(DialogService);
    productService = TestBed.inject(ProductsService);
    httpService = TestBed.inject(HttpRoutingService);
    router = TestBed.inject(Router);
    snackbarService = TestBed.inject(SnackbarService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and populate dataSource', fakeAsync(() => {
    const mockData = [
      { id: 1, name: 'Test Product 1', price: 100 },
      { id: 2, name: 'Test Product 2', price: 200 },
    ];
    spyOn(productService, 'getAllProducts').and.returnValue(of({ productList: { rows: mockData } }));

    fixture.detectChanges();
    tick();

    expect(productService.getAllProducts).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockData);
  }));

  it('should apply filter to the data source', () => {
    const filterValue = 'TestFilter';
    const inputElement = document.createElement('input');
    spyOnProperty(inputElement, 'value', 'get').and.returnValue(filterValue);
    const event = new Event('input', { bubbles: true });
    Object.defineProperty(event, 'target', { value: inputElement, enumerable: true });
    const mockData = [
      { name: 'TestName1', value: 1 },
      { name: 'TestName2', value: 2 },
      { name: 'AnotherName', value: 3 }
    ];
    const dataSource = new MatTableDataSource<any>(mockData);
    component.dataSource = dataSource;
    component.filterData(event);
    expect(component.dataSource.filter).toBe(filterValue.trim().toLowerCase());
  });


  it('should navigate to productDetails page in edit mode when onEdit is called', () => {
    const data = { id: 12 };
    component.onEdit(data);
    expect(component.onEdit).toHaveBeenCalledWith(['/app/productDetails', 'edit', data.id]);
  });

  it('should call onDelete', () => {
    const data = { id: 2 };
    component.ELEMENT_DATA = [{ id: 2, name: 'table', price: 200 }];
    result = true;
    spyOn(dialogService, 'openConfirmationDialog').and.returnValue({
      afterClosed: () => of(result)
    });
    const deleteProductSpy = spyOn(httpService, 'deleteProduct').and.returnValue(of({ success: true }));
    const openSnackbarSpy = spyOn(snackbarService, 'openSnackbar');
    component.onDelete(data);
    expect(dialogService.openConfirmationDialog).toHaveBeenCalled();
    expect(deleteProductSpy).toHaveBeenCalledWith(2);
    expect(openSnackbarSpy).toHaveBeenCalledWith('Product deleted Successfully', 'Success');
    expect(component.ELEMENT_DATA.length).toBe(0);
  });

  it('should call onDelete and handle error', () => {
    const data = { id: 2 };
    component.ELEMENT_DATA = [{ id: 2, name: 'table', price: 200 }];
    result = true;
    spyOn(dialogService, 'openConfirmationDialog').and.returnValue({
      afterClosed: () => of(result)
    });
    const errorResponse = { error: { error: 'Error occurred' } };
    spyOn(httpService, 'deleteProduct').and.returnValue(throwError(errorResponse));
    const openSnackbarSpy = spyOn(snackbarService, 'openSnackbar');
    component.onDelete(data);
    expect(dialogService.openConfirmationDialog).toHaveBeenCalled();
    expect(httpService.deleteProduct).toHaveBeenCalledWith(2);
    expect(openSnackbarSpy).toHaveBeenCalledWith('Error occurred while deleting product', 'Error');
    expect(component.ELEMENT_DATA.length).toBe(1);
  });


});
