import { Component, OnInit } from '@angular/core';
import { ProductsService } from './core/services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'TestAngularProject';

  constructor(private productService: ProductsService){}

  ngOnInit(): void {
    this.productService.getMessage();
  }
}
