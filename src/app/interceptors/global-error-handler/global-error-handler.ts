import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CanOpenErrorPageGuard } from 'src/app/guards/can-open-error-page/can-open-error-page.guard';
import { EmailService } from '@shop/services/email.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

	constructor(private router: Router, private canOpenErrorPageGuard: CanOpenErrorPageGuard, private zone: NgZone,
							private emailService: EmailService) { }

	public handleError(error: Error): void {
		this.canOpenErrorPageGuard.isErrorThrown = true;
		this.zone.run(() => {
			this.router.navigate(['/error']);
			//this.emailService.sendErrorMessage(error);
		});
		console.log(error.name);
		console.log(error.message)
		console.log(error.stack);
	}
}
