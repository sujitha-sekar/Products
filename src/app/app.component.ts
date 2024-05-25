import { Component, OnInit } from '@angular/core';
import { ProductsService } from './core/services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TestAngularProject';

  constructor(private productService: ProductsService) { }
  /**
   * Angular lifecycle hook that is called after the component's view has been fully initialized.
   * Fetches error messages by calling the getMessage method of the ProductsService.
   */
  ngOnInit(): void {
    this.productService.getMessage();
  }
}
