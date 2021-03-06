// Modules
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MaterialModules } from '../ui/material/material.modules';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
// Store
import { reducers } from '@store/.';
import { ProductsTableEffects } from '@store/effects/productsTable.effects';
// Routing
import { ShopRoutingModule } from './shop-routing.module';
// Components
import { HeaderComponent } from './components/header/header.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ShopComponent } from './shop.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ContactsFormComponent } from './components/contacts-form/contacts-form.component';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';
import { ProductOptionsComponent } from './components/product-options/product-options.component';
import { CartComponent } from './components/cart/cart.component';
import { FullPhotoComponent } from './components/full-photo/full-photo.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
// Services
import { GalleryService } from './services/gallery.service';
import { ProductsService } from 'src/app/components/shop/services/products.service';
import { EmailService } from 'src/app/components/shop/services/email.service';
import { DialogService } from './services/dialog.service';
import { HTMLGeneratorService } from './services/html-generator.service';
import { LocalStorageService } from './services/local-storage.service';
import { ProductsOptionsService } from 'src/app/components/shop/services/products-options.service';
// Pipes
import { SizePipe } from 'src/app/components/shop/pipes/size/size.pipe';
// Guards
import { CanOpenProductGuard } from 'src/app/components/shop/guards/can-open-product/can-open-product.guard';
import { CanCloseProductsTableGuard } from './guards/can-close-products-table/can-close-products-table.guard';
import { CanCloseProductPageGuard } from './guards/can-close-product-page/can-close-product-page.guard';
import { CanOpenProductsTableGuard } from './guards/can-open-products-table/can-open-products-table.guard';
// Other
import ru from '@angular/common/locales/ru';
import { environment } from 'src/environments/environment';

@NgModule({
	declarations: [
		HeaderComponent,
		ContactsComponent,
		ShopComponent,
		ProductCardComponent,
		ProductPageComponent,
		ProductsTableComponent,
		LazyImageComponent,
		ProductOptionsComponent,
		ContactsFormComponent,
		CartComponent,
		FullPhotoComponent,
		HomePageComponent,
		SizePipe,
		NotFoundComponent,
		PaginatorComponent,
		ConfirmDialogComponent
	],
	imports: [
		CommonModule,
		ShopRoutingModule,
		HttpClientModule,
		HttpClientJsonpModule,
		ReactiveFormsModule,
		...MaterialModules,
		StoreModule.forRoot(reducers),
		StoreRouterConnectingModule.forRoot(),
		EffectsModule.forRoot([ProductsTableEffects]),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
	],
	providers: [
		SizePipe,
		GalleryService,
		ProductsService,
		ProductsOptionsService,
		EmailService,
		DialogService,
		HTMLGeneratorService,
		LocalStorageService,
		CanOpenProductGuard,
		CanOpenProductsTableGuard,
		CanCloseProductPageGuard,
		CanCloseProductsTableGuard
	],
	bootstrap: [ShopComponent]
})
export class ShopModule {
	constructor() {
		registerLocaleData(ru);
	}
}
