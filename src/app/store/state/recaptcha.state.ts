import { RecaptchaComponent } from 'ng-recaptcha';

export interface RecaptchaState {
	recaptcha: RecaptchaComponent;
}

export const initialRecaptchaState: RecaptchaState = {
	recaptcha: null
};
