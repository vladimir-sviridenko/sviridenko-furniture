import { ErrorHandler, Injectable, NgZone, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { CanOpenErrorPageGuard } from 'src/app/guards/can-open-error-page/can-open-error-page.guard';
import { EmailService } from '@shop/services/email.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

	constructor(private router: Router, private zone: NgZone,
		private canOpenErrorPageGuard: CanOpenErrorPageGuard,
		private emailService: EmailService) { }

	public handleError(error: Error): void {
		this.canOpenErrorPageGuard.isErrorThrown = true;
		this.zone.run(() => {
			this.router.navigate(['/error']);
			if (isDevMode()) {
				throw error;
			} else {
				this.emailService.sendErrorMessage(error);
			}
		});
	}
}
