import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopModule } from './shop/shop.module';
import { ErrorComponent } from './error/error.component';
import { GlobalErrorHandler } from '@core/interceptors/global-error-handler';
import { CanOpenErrorPageGuard } from '@core/guards/can-open-error-page.guard';
import { MaterialModules } from './material.modules';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    ShopModule,
    AppRoutingModule,
    ...MaterialModules,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
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
