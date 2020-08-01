// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ShopModule } from './components/shop/shop.module';
import { MaterialModules } from './components/ui/material/material.modules';
import { RecaptchaModule, RECAPTCHA_LANGUAGE, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
// Components
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
// Guards
import { CanOpenErrorPageGuard } from 'src/app/guards/can-open-error-page/can-open-error-page.guard';
import { RecaptchaService } from './services/recaptcha.service';
// Intercaptors
import { GlobalErrorHandler } from './interceptors/global-error-handler/global-error-handler';

@NgModule({
	declarations: [
		AppComponent,
		ErrorComponent
	],
	imports: [
		ShopModule,
		AppRoutingModule,
		RecaptchaModule,
		BrowserAnimationsModule,
		...MaterialModules,
	],
	providers: [
		{
			provide: ErrorHandler,
			useClass: GlobalErrorHandler
		},
		{
			provide: RECAPTCHA_SETTINGS,
			useValue: { siteKey: '6Le-FqYZAAAAAIlYg4uhQ-_-_slP_xKXkHvNpx1L' } as RecaptchaSettings,
		},
		{
			provide: RECAPTCHA_LANGUAGE,
			useValue: 'ru',
		},
		RecaptchaService,
		CanOpenErrorPageGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
