import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductsTableComponent } from './products-table/products-table.component';
import { ProductPageComponent } from './product-page/product-page.component';

const routes: Routes = [
  {path: 'shop/:albumId', component: ProductsTableComponent},
  {path: 'item/:productId', component: ProductPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
