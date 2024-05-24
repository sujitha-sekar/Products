import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRoutingService } from '../../services/http-routing.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productsForm!: FormGroup;
  category: any;
  updateData: boolean = false;
  paramData = {
    id: '',
    data: ''
  }
  productDetails: any;
  messages: any;

  constructor(private snackbarService: SnackbarService,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private httpService: HttpRoutingService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.productService.message.subscribe(res => this.messages = res);

    this.route.params.subscribe((res: any) => {
      console.log(res);
      if (res && res?.id) {
        this.paramData.id = res?.id;
        this.paramData.data = res?.data;
        this.httpService.getProductById(this.paramData.id).subscribe((res: any) => {
          this.productDetails = res.productDetails;
          console.log('productDetails', this.productDetails);
          if (this.productDetails) {
            this.updateData = true;
            this.formInitalize();
          }
        })
      }
    })

    this.productsForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      price: new FormControl(null, [Validators.required, Validators.min(0.01), Validators.pattern(/^\d+(\.\d{1,2})?$/)])
    });
  };

  formInitalize() {
    this.productsForm = new FormGroup({
      name: new FormControl(this.productDetails && this.productDetails?.name ? this.productDetails?.name : null, Validators.required),
      description: new FormControl(this.productDetails && this.productDetails ? this.productDetails?.description : null),
      price: new FormControl(this.productDetails && this.productDetails ? this.productDetails?.price : null, [Validators.required, Validators.min(0.01), Validators.pattern(/^\d+(\.\d{1,2})?$/)])
    });
  }

  onSave() {
    if (this.productsForm.valid) {
      console.log('Form: ', this.productsForm.value);
      if (!this.updateData) {
        this.productService.createProduct(this.productsForm.value).subscribe((res: any) => {
          if (res) {
            this.productsForm.reset();
            console.log('Created:', res);
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

  onNavigate() {
    this.router.navigate(['/app/productList']);
  }

}
