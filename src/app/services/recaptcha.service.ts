import { Injectable } from '@angular/core';
import { RecaptchaComponent } from 'ng-recaptcha';
import { Subject } from 'rxjs';

@Injectable()
export class RecaptchaService {
	public recaptcha$: Subject<RecaptchaComponent> = new Subject<RecaptchaComponent>();
}
