import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productsForm!: FormGroup;
  category: any; 

  constructor(private snackbarService: SnackbarService){}

  ngOnInit(): void {
    this.productsForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      categoryId: new FormControl(null, Validators.required)
    });
  }

  onSave() {
    if(this.productsForm.valid) {
      console.log('Form: ', this.productsForm.value);
    } else {
      this.snackbarService.openSnackbar('Please fill the mantatory field', 'Warning');
    }
  }

}
