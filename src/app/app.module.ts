import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { ContactsComponent } from './core/header/contacts/contacts.component';
import { ShopComponent } from './shop/shop.component';

import { MaterialModules } from './material.modules';

import { ProductsService } from '@services/products.service';
import { GalleryService } from './core/http/gallery.service';
import { KitchenCabinetService } from '@core/services/kitchen-cabinet.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ShopComponent
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
