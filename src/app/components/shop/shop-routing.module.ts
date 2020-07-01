import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ShopComponent } from './shop.component';
import { CanOpenProductGuard } from 'src/app/components/shop/guards/can-open-product/can-open-product.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CanCloseProductPageGuard } from './guards/can-close-product-page/can-close-product-page.guard';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CanOpenHomePageGuard } from './guards/can-open-home-page/can-open-home-page.guard';
import { CanCloseProductsTableGuard } from './guards/can-close-products-table/can-close-products-table.guard';
import { CanOpenProductsTableGuard } from './guards/can-open-products-table/can-open-products-table.guard';

const shopChildrenRoutes: Routes = [
	{ path: 'home', component: HomePageComponent, canActivate: [CanOpenHomePageGuard] },
	{ path: '404', component: NotFoundComponent },
	{
		path: 'shop/:albumId',
		component: ProductsTableComponent,
		canActivate: [CanOpenProductsTableGuard],
		canDeactivate: [CanCloseProductsTableGuard]
	},
	{
		path: 'shop/:albumId/:productId',
		component: ProductPageComponent,
		canActivate: [CanOpenProductGuard],
		canDeactivate: [CanCloseProductPageGuard]
	},
];

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: '', component: ShopComponent, children: shopChildrenRoutes }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShopRoutingModule { }
