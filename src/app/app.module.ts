import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopModule } from './components/shop/shop.module';
import { ErrorComponent } from './components/error/error.component';
import { CanOpenErrorPageGuard } from 'src/app/guards/can-open-error-page/can-open-error-page.guard';
import { MaterialModules } from './ui/material/material.modules';
import { GlobalErrorHandler } from './interceptors/global-error-handler/global-error-handler';

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
