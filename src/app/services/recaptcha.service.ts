import { Injectable } from '@angular/core';
import { RecaptchaComponent } from 'ng-recaptcha';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class RecaptchaService {
	public recaptcha$: BehaviorSubject<RecaptchaComponent> = new BehaviorSubject<RecaptchaComponent>(null);
	public isRecaptchaExecuting$: Subject<boolean> = new Subject<boolean>();
	public isRecaptchaCanceled$: Subject<void> = new Subject<void>();
}
