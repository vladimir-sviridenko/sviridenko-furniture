import { ActionReducer, createReducer, on } from '@ngrx/store';
import { RecaptchaState, initialRecaptchaState } from '@store/state/recaptcha.state';
import * as ActionRecaptcha from '@store/actions/recaptcha.actions';
import { RecaptchaComponent } from 'ng-recaptcha';

export const reducer: ActionReducer<RecaptchaState> = createReducer(
	initialRecaptchaState,
	on(ActionRecaptcha.setRecaptcha, (state: RecaptchaState, { recaptcha }: { recaptcha: RecaptchaComponent }): RecaptchaState => {
		return {
			...state,
			recaptcha
		};
	})
);
