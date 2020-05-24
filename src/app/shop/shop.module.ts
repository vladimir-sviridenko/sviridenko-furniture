import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MaterialModules } from '../material.modules';
import { ShopRoutingModule } from './shop-routing.module';

import { HeaderComponent } from '../_core/header/header.component';
import { ContactsComponent } from '../_core/header/contacts/contacts.component';
import { ShopComponent } from './shop.component';
import { ProductCardComponent} from './product-card/product-card.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsTableComponent } from './products-table/products-table.component';

import { ProductsService } from '@services/products.service';
import { GalleryService } from '../_core/http/gallery.service';
import { KitchenCabinetService } from '@services/kitchen-cabinet.service';
import { FacadeService } from '@services/facade.service';
import { SkinService } from '@services/skin.service';
import { FacadeOptionComponent } from './product-page/facade-option/facade-option.component';
import { SkinOptionComponent } from './product-page/skin-option/skin-option.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ContactsComponent,
    ShopComponent,
    ProductCardComponent,
    ProductPageComponent,
    ProductsTableComponent,
    FacadeOptionComponent,
    SkinOptionComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ...MaterialModules
  ],
  providers: [ProductsService, GalleryService, KitchenCabinetService, FacadeService, SkinService],
  bootstrap: [ShopComponent]
})
export class ShopModule { }
