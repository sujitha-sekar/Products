import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { InputValidDirective } from './directives/input-valid.directive';



@NgModule({
  declarations: [
    NavbarComponent,
    ProductListComponent,
    ProductDetailsComponent,
    InputValidDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ]
})
export class CoreModule { }
