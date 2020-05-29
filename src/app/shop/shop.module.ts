import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MaterialModules } from '../material.modules';
import { ShopRoutingModule } from './shop-routing.module';

import { HeaderComponent } from '../_core/header/header.component';
import { ContactsComponent } from '../_core/header/contacts/contacts.component';
import { ShopComponent } from './shop.component';
import { ProductCardComponent} from './_components/product-card/product-card.component';
import { ProductPageComponent } from './_pages/product-page/product-page.component';
import { ProductsTableComponent } from './_pages/products-table/products-table.component';
import { FacadeOptionComponent } from './_components/product-options/facade-option/facade-option.component';
import { SkinOptionComponent } from './_components/product-options/skin-option/skin-option.component';
import { LazyImageComponent } from './_components/lazy-image/lazy-image.component';
import { ProductOptionsComponent } from './_components/product-options/product-options.component';
import { RequestCallComponent } from './_components/request-call/request-call.component';
import { CartComponent } from './_components/cart/cart.component';

import { GalleryService } from '../_core/http/gallery.service';
import { KitchenCabinetService } from '@services/kitchen-cabinet.service';
import { FacadeService } from '@services/facade.service';
import { SkinService } from '@services/skin.service';
import { EmailService } from '@services/email.service';
import { CanOpenProductGuard } from '@core/guards/can-open-product.guard';
import { SizePipe } from '@shared/pipes/size.pipe';

import ru from '@angular/common/locales/ru';
import { CanOpenAlbumGuard } from '@core/guards/can-open-album.guard';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ShopEffects } from 'src/app/_store/shop/shop.effects';
import { reducers } from 'src/app/_store/AppState';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [
    HeaderComponent,
    ContactsComponent,
    ShopComponent,
    ProductCardComponent,
    ProductPageComponent,
    ProductsTableComponent,
    FacadeOptionComponent,
    SkinOptionComponent,
    LazyImageComponent,
    ProductOptionsComponent,
    RequestCallComponent,
    CartComponent,
    SizePipe
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
    EffectsModule.forRoot([ShopEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    GalleryService,
    KitchenCabinetService,
    FacadeService,
    SkinService,
    EmailService,
    CanOpenProductGuard,
    CanOpenAlbumGuard
  ],
  bootstrap: [ShopComponent]
})
export class ShopModule {
  constructor() {
    registerLocaleData(ru);
  }
}
