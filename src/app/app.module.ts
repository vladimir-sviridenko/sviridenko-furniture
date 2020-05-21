import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './_core/header/header.component';
import { ContactsComponent } from './_core/header/contacts/contacts.component';
import { ShopComponent } from './shop/shop.component';

import { MaterialModules } from './material.modules';

import { ProductsService } from '@services/products.service';
import { GalleryService } from './_core/http/gallery.service';
import { KitchenCabinetService } from './_core/services/kitchen-cabinet.service';
import { ProductCardComponent } from './shop/product-card/product-card.component';
import { ProductPageComponent } from './shop/product-page/product-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ShopComponent,
    ProductCardComponent,
    ProductPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ...MaterialModules
  ],
  providers: [ProductsService, GalleryService, KitchenCabinetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
