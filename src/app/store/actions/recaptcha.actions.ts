import { RecaptchaComponent } from 'ng-recaptcha';
import { createAction, props } from '@ngrx/store';
import { InjectAction } from '@shop/models/inject-action';

export const setRecaptcha: InjectAction<string, { recaptcha: RecaptchaComponent}> = createAction(
	'[RECAPTCHA/API] Set recaptcha',
	props<{ recaptcha: RecaptchaComponent }>()
);
