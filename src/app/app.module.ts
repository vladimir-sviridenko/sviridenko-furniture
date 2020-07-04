// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ShopModule } from './components/shop/shop.module';
import { MaterialModules } from './components/ui/material/material.modules';
// Components
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
// Guards
import { CanOpenErrorPageGuard } from 'src/app/guards/can-open-error-page/can-open-error-page.guard';
// Intercaptors
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
