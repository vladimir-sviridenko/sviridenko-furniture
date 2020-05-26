import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MaterialModules } from '../material.modules';
import { ShopRoutingModule } from './shop-routing.module';

import { HeaderComponent } from '../_core/header/header.component';
import { ContactsComponent } from '../_core/header/contacts/contacts.component';
import { ShopComponent } from './shop.component';
import { ProductCardComponent} from './product-card/product-card.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { FacadeOptionComponent } from './product-options/facade-option/facade-option.component';
import { SkinOptionComponent } from './product-options/skin-option/skin-option.component';
import { ImageComponent } from './image/image.component';
import { ProductOptionsComponent } from './product-options/product-options.component';
import { RequestCallComponent } from './request-call/request-call.component';

import { ProductsService } from '@services/products.service';
import { GalleryService } from '../_core/http/gallery.service';
import { KitchenCabinetService } from '@services/kitchen-cabinet.service';
import { FacadeService } from '@services/facade.service';
import { SkinService } from '@services/skin.service';
import { EmailService } from '@services/email.service';
import { CanOpenProductGuard } from '@core/guards/can-open-product.guard';
import { SizePipe } from '@shared/pipes/size.pipe';

import ru from '@angular/common/locales/ru';

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
    ImageComponent,
    ProductOptionsComponent,
    RequestCallComponent,
    SizePipe
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    ...MaterialModules
  ],
  providers: [
    ProductsService,
    GalleryService,
    KitchenCabinetService,
    FacadeService,
    SkinService,
    CanOpenProductGuard,
    EmailService
  ],
  bootstrap: [ShopComponent]
})
export class ShopModule {
  constructor() {
    registerLocaleData(ru);
  }
}
