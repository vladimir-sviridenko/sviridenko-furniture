import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';
import { ContactsComponent } from './header/contacts/contacts.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsTableComponent } from './products-table/products-table.component';

import { MaterialModules } from './material.modules';

import { GalleryService } from './services/gallery.service';
import { KitchenCabinetService } from './services/kitchen-cabinet.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ContactsComponent,
    ProductPageComponent,
    ProductCardComponent,
    ProductsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ...MaterialModules
  ],
  providers: [GalleryService, KitchenCabinetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
