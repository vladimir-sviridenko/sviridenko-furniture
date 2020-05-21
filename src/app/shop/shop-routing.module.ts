import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductsTableComponent } from './products-table/products-table.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ShopComponent } from './shop.component';

const shopChildrenRoutes: Routes = [
  {path: ':albumId', component: ProductsTableComponent},
  {path: 'item/:productId', component: ProductPageComponent}
];

const routes: Routes = [
  {path: 'shop', redirectTo: 'shop/375686981', pathMatch: 'full'},
  {path: 'shop', component: ShopComponent, children: shopChildrenRoutes}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
