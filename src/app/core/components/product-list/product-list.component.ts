import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogService } from '../../../shared/services/dialog.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { HttpRoutingService } from '../../services/http-routing.service';
import { Router } from '@angular/router';
import { ProductDetails } from '../../models/product-details.model';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  /**
   * Specifies the columns to be displayed in the table.
   * @type {Array}
   */
  displayedColumns: string[] = ['id', 'name', 'price', 'action'];
  /**
   * Represents the data source for the MatTable.
   */
  dataSource = new MatTableDataSource<ProductDetails>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  /**
   * Variable used to stores the data fetched from the server.
   */
  ELEMENT_DATA: ProductDetails[] = [];
  /**
 * Constructor to inject necessary services.
 * @param snackbarService Service to display snackbar notifications.
 * @param productService Service to manage product operations.
 * @param dialogSevice Service to display confirmation dialog.
 * @param httpService Service to handle HTTP requests.
 * @param router Service to handle navigation.
 */
  constructor(private productService: ProductsService,
    private dialogSevice: DialogService,
    private snackbarService: SnackbarService,
    private httpService: HttpRoutingService,
    private router: Router
  ) { }
  /**
   * Angular lifecycle hook that is called after the component's view has been fully initialized.
   */
  ngOnInit(): void {
    // Get all products from table
    this.productService.getAllProducts().subscribe((res: any) => {
      if (res) {
        this.ELEMENT_DATA = res.productList?.rows;
        this.dataSource = new MatTableDataSource<ProductDetails>(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  /**
   * Filter data in the table.
   * @param event The event containing the filter value.
   */
  filterData(event: any) {
    const filterValue = (event.target as HTMLInputElement)?.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  };
  /**
   * Navigates to the product details page for editing.
   * @param data The data of the product to be edited.
   */
  onEdit(data: any) {
    this.router.navigate(['/app/productDetails', 'edit', data?.id]);
  }

  /**
   * Delete product data in the table.
   * @param data The data of the products to be deleted.
   */
  onDelete(data: any) {
    this.dialogSevice.openConfirmationDialog('Are you sure you want to delete this data?').afterClosed().subscribe((res: any) => {
      if (res) {
        this.httpService.deleteProduct(data?.id).subscribe((response) => {
          if (response) {
            const index = this.ELEMENT_DATA.findIndex(x => x.id === data?.id);
            if (index != 1) {
              this.ELEMENT_DATA.splice(index, 1);
              this.dataSource = new MatTableDataSource<ProductDetails>(this.ELEMENT_DATA);
              this.dataSource.paginator = this.paginator;
              this.snackbarService.openSnackbar('Product deleted Successfully', 'Success');
            }
          }
        }, (err) => {
          if (err.error && err.error.error) {
            this.snackbarService.openSnackbar('Error occurred while deleting product', 'Error');
          };
        });
      }
    });
  };

}
