import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecaptchaComponent } from 'ng-recaptcha';
import { AppState } from '..';
import { Store } from '@ngrx/store';
import * as ActionRecaptcha from '@store/actions/recaptcha.actions';
import * as SelectorRecaptcha from '@store/selectors/recaptcha.selectors';

@Injectable({
	providedIn: 'root'
})
export class RecaptchaFacadeService {
	constructor(private store: Store<AppState>) {}

	public get recaptcha$(): Observable<RecaptchaComponent> {
		return this.store.select(SelectorRecaptcha.selectRecaptcha);
	}

	public setRecaptcha(recaptcha: RecaptchaComponent): void {
		this.store.dispatch(ActionRecaptcha.setRecaptcha({ recaptcha }));
	}
}
