import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CanOpenErrorPageGuard } from '@core/guards/can-open-error-page.guard';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private router: Router, private canProceedToErrorPageGuard: CanOpenErrorPageGuard, private zone: NgZone) { }

  handleError(error: Error) {
    this.canProceedToErrorPageGuard.isErrorThrown = true;
    this.zone.run(() => this.router.navigate(['/error']));
    //  todo: send message to my email
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);
  }
}
