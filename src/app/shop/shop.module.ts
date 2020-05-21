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

@NgModule({
  declarations: [
    HeaderComponent,
    ContactsComponent,
    ShopComponent,
    ProductCardComponent,
    ProductPageComponent,
    ProductsTableComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ...MaterialModules
  ],
  providers: [ProductsService, GalleryService, KitchenCabinetService],
  bootstrap: [ShopComponent]
})
export class ShopModule { }
