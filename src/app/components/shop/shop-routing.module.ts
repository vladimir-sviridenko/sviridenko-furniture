import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ShopComponent } from './shop.component';
import { CanOpenProductGuard } from 'src/app/components/shop/guards/can-open-product/can-open-product.guard';
import { CanOpenAlbumGuard } from 'src/app/components/shop/guards/can-open-album/can-open-album.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CanCloseProductPageGuard } from './guards/can-close-product-page/can-close-product-page.guard';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CanOpenHomePageGuard } from './guards/can-open-home-page/can-open-home-page.guard';

const shopChildrenRoutes: Routes = [
	{path: 'home', component: HomePageComponent, canActivate: [CanOpenHomePageGuard]},
  {path: '404', component: NotFoundComponent },
  {path: 'shop/:albumId', component: ProductsTableComponent, canActivate: [CanOpenAlbumGuard]},
	{
		path: 'shop/:albumId/:productId', component: ProductPageComponent,
		canActivate: [CanOpenProductGuard],
		canDeactivate: [CanCloseProductPageGuard]
	},
];

const routes: Routes = [
	{path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '', component: ShopComponent, children: shopChildrenRoutes}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }