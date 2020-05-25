import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CanProceedToErrorPageGuard } from '@core/guards/can-proceed-to-error-page.guard';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private router: Router, private canProceedToErrorPageGuard: CanProceedToErrorPageGuard, private zone: NgZone) {}

  handleError(error: Error) {
    this.canProceedToErrorPageGuard.isErrorThrown = true;
    this.zone.run(() => this.router.navigate(['/error']));
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);
  }
}
