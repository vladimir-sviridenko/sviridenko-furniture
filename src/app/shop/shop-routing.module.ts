import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductsTableComponent } from './_pages/products-table/products-table.component';
import { ProductPageComponent } from './_pages/product-page/product-page.component';
import { ShopComponent } from './shop.component';
import { CanOpenProductGuard } from '@core/guards/can-open-product.guard';
import { CanOpenAlbumGuard } from '@core/guards/can-open-album.guard';
import { NotFoundComponent } from './_pages/not-found/not-found.component';

const shopChildrenRoutes: Routes = [
  {path: '404', component: NotFoundComponent },
  {path: 'shop/:albumId', component: ProductsTableComponent, canActivate: [CanOpenAlbumGuard]},
  {path: 'shop/:albumId/:productId', component: ProductPageComponent, canActivate: [CanOpenProductGuard]},
];

const routes: Routes = [
  {path: '', redirectTo: 'shop/375686981', pathMatch: 'full'},
  {path: '', component: ShopComponent, children: shopChildrenRoutes}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
