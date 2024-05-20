import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface DataArray {
  price: number;
  color: string;
}
export interface ProductLists {
  id: number;
  name: string;
  data: DataArray[];
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'name', 'price', 'color', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productList: ProductLists[] = [];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((res: any) => {
      console.log('All Products: ', res);
      if (res) {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }   
    });
  }

}
