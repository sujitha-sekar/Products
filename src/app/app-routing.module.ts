import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { ProductListComponent } from './core/components/product-list/product-list.component';
import { ProductDetailsComponent } from './core/components/product-details/product-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: 'app', component: NavbarComponent, children: [
    { path: 'productList', component: ProductListComponent },   
    { path: 'productDetails', component: ProductDetailsComponent },
    { path: 'productDetails/:data/:id', component: ProductDetailsComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
