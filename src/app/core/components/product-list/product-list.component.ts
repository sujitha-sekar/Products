import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogService } from '../../../shared/services/dialog.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { HttpRoutingService } from '../../services/http-routing.service';
import { Router } from '@angular/router';
export interface ProductLists {
  id: number;
  name: string;
  description: string;
  price: number;
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'name', 'price', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA : any[] = [];
  constructor(private productService: ProductsService,
    private dialogSevice: DialogService,
    private snackbarService: SnackbarService,
    private httpService: HttpRoutingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((res: any) => {
      console.log('All Products: ', res.productList);
      if (res) {
        this.ELEMENT_DATA = res.productList?.rows;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  filterData(event: any) {
    const filterValue = (event.target as HTMLInputElement)?.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  };

  onEdit(data: any) {
    this.router.navigate(['/app/productDetails', 'edit', data?.id]);
  }

  onDelete(data: any) {
    this.dialogSevice.openConfirmationDialog('Are you sure you want to delete this data?').afterClosed().subscribe((res: any) => {
      if (res) {
        this.httpService.deleteProduct(data?.id).subscribe((response) => {
          console.log('deleted data: ', response);
          if (response) {
            const index = this.ELEMENT_DATA.findIndex(x => x.id === data?.id);
            if (index != 1) {
              this.ELEMENT_DATA.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
              this.dataSource.paginator = this.paginator;
              this.snackbarService.openSnackbar('Product deleted Successfully', 'Success');
            }
          }
        }, (err) => {
          if (err.error && err.error.error) {
            this.snackbarService.openSnackbar('Error occuired while delete product', 'Error');            
          };
        });
      }
    });
  };

}
