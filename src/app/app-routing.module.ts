import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsTableComponent } from './products-table/products-table.component';

const routes: Routes = [
  {path: '', redirectTo: 'products/375686981', pathMatch: 'full'},
  {path: 'products/:albumId', component: ProductsTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
