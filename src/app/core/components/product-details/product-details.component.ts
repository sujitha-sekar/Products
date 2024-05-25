import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRoutingService } from '../../services/http-routing.service';
import { Message, ProductDetails } from '../../models/product-details.model';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  /**
   * Form group for managing the product form.
   * @type {FormGroup}
   */
  productsForm!: FormGroup;
  /**
   * Flag to determine if the form is for updating an existing product.
   * @type {boolean}
   */
  updateData: boolean = false;
  /**
   * Object to hold route parameters data.
   * @type {object}
   */
  paramData = {
    id: '',
    data: ''
  };
  /**
   * Object to hold product details retrieved from the server.
   */
  productDetails!: ProductDetails;
  /**
   * Variable to hold messages received from the product service.
   * @type {Message}
   */
  messages!: Message;
  /**
   * Constructor to inject necessary services.
   * @param snackbarService Service to display snackbar notifications.
   * @param productService Service to manage product operations.
   * @param route Service to access route parameters.
   * @param httpService Service to handle HTTP requests.
   * @param router Service to handle navigation.
   */
  constructor(private snackbarService: SnackbarService,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private httpService: HttpRoutingService,
    private router: Router
  ) { }
  /**
    * Angular lifecycle hook that is called after the component's view has been fully initialized.
    */
  ngOnInit(): void {
    // Subscribe to messages from the product service.
    this.productService.message.subscribe(res => this.messages = res);

    // Subscribe to route parameters to retrieve product details if an ID is present.
    this.route.params.pipe(
      switchMap((res: any) => {
        if (res && res.id) {
          this.paramData.id = res.id;
          this.paramData.data = res.data;
          return this.httpService.getProductById(this.paramData.id);
        } else {
          return of(null);
        }
      })
    ).subscribe((res: any) => {
      if (res && res.productDetails) {
        this.productDetails = res.productDetails;
        this.updateData = true;
        this.formInitalize();
      }
    });

    // Initialize the product form with default values.
    this.productsForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      price: new FormControl(null, [Validators.required, Validators.min(0.01), Validators.pattern(/^\d+(\.\d{1,2})?$/)])
    });
  };
  /**
   * Method to initialize the product form with existing product details.
   */
  formInitalize() {
    this.productsForm = new FormGroup({
      name: new FormControl(this.productDetails && this.productDetails?.name ? this.productDetails?.name : null, Validators.required),
      description: new FormControl(this.productDetails && this.productDetails ? this.productDetails?.description : null),
      price: new FormControl(this.productDetails && this.productDetails ? this.productDetails?.price : null, [Validators.required, Validators.min(0.01), Validators.pattern(/^\d+(\.\d{1,2})?$/)])
    });
  }
  /**
   * Method to handle form submission for saving or updating a product.
   */
  onSave() {
    if (this.productsForm.valid) {
      if (!this.updateData) {
        // Create new product
        this.productService.createProduct(this.productsForm.value).subscribe((res: any) => {
          if (res) {
            this.productsForm.reset();
            this.snackbarService.openSnackbar('Product Saved successfully', 'Success');
          }
        }, (err) => {
          if (err) {
            this.snackbarService.openSnackbar('Error occured while create the product', 'Error')
          }
        });
      } else {
        this.productsForm.value.id = +this.paramData?.id;
        if (this.productsForm.dirty) {
          // Update existing product
          this.httpService.updateProduct(this.productsForm.value.id, this.productsForm.value).subscribe((res: any) => {
            if (res) {
              this.productsForm.markAsPristine();
              this.snackbarService.openSnackbar('Product updated Successfully', 'Success');
              this.router.navigate(['/app/productList']);
            }
          }, (err) => {
            if (err) {
              this.snackbarService.openSnackbar('Error occured while update product', 'Error');
            }
          });
        } else {
          this.snackbarService.openSnackbar('You have not change any product values', 'Warning', 5000)
        }
      }
    } else {
      this.snackbarService.openSnackbar('Please fill the mantatory field', 'Warning');
    }
  };
  /**
   * Method to navigate to the product list page.
   */
  onNavigate() {
    this.router.navigate(['/app/productList']);
  }

}
