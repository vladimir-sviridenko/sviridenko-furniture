import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopModule } from './shop/shop.module';
import { ErrorComponent } from './error/error.component';
import { GlobalErrorHandler } from '@core/interceptors/global-error-handler';
import { CanOpenErrorPageGuard } from '@core/guards/can-open-error-page.guard';
import { MaterialModules } from './material.modules';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    ShopModule,
    AppRoutingModule,
    ...MaterialModules
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    CanOpenErrorPageGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
