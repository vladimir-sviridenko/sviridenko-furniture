import { AppState, FeatureKey } from '..';
import { RecaptchaComponent } from 'ng-recaptcha';
import { MemoizedSelector, createSelector, createFeatureSelector } from '@ngrx/store';
import { RecaptchaState } from '@store/state/recaptcha.state';

export const selectRecaptchaState: MemoizedSelector<AppState, RecaptchaState>
		= createFeatureSelector<AppState, RecaptchaState>(FeatureKey.Recaptcha);

export const selectRecaptcha: MemoizedSelector<AppState, RecaptchaComponent>
		= createSelector(selectRecaptchaState, (state: RecaptchaState) => state.recaptcha);
