import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { RecaptchaComponent } from 'ng-recaptcha';
import { RecaptchaService } from './services/recaptcha.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {

	@ViewChild(RecaptchaComponent)
	public recaptcha: RecaptchaComponent;

	constructor(private recaptchaService: RecaptchaService) {}

	public ngAfterViewInit(): void {
		this.recaptchaService.recaptcha$.next(this.recaptcha);
	}
}
