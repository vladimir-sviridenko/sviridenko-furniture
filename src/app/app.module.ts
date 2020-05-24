import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopModule } from './shop/shop.module';
import { ErrorComponent } from './error/error.component';
import { GlobalErrorHandler } from '@core/interceptors/global-error-handler';
import { CanProceedToErrorPageGuard } from '@core/guards/can-proceed-to-error-page.guard';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    ShopModule,
    AppRoutingModule
  ],
  providers: [
    // {
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandler
    // },
    CanProceedToErrorPageGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
