import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserContacts } from '@shop/models/user-contacts';
import { BehaviorSubject, Subject } from 'rxjs';
import { SubmitType } from '@shop/models/enums/submit-type.enum';
import { SubmitStatus } from '@shop/models/submit-status';
import { ContactsSubmit } from '@shop/models/contacts-submit';
import { EmailJSResponseStatus } from 'emailjs-com';
import { take, tap, switchMap, takeUntil } from 'rxjs/operators';
import { RecaptchaService } from 'src/app/services/recaptcha.service';
import { RecaptchaComponent } from 'ng-recaptcha';

@Component({
	selector: 'app-contacts-form',
	templateUrl: './contacts-form.component.html',
	styleUrls: ['./contacts-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsFormComponent {

	public isLoading: boolean = false;
	public formTitle$: BehaviorSubject<string> = new BehaviorSubject<string>('Ваши контакты');

	public contactsForm: FormGroup = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.pattern('^(?!\\s*$).+')]),
		phone: new FormControl('', [Validators.required, Validators.pattern('^((\\+7|7|8)+([0-9]){10})$')]),
		email: new FormControl('', [Validators.required, Validators.pattern('.+@.+\\..+')])
	});

	get userContacts(): UserContacts {
		return {
			name: this.contactsForm.controls.name.value,
			phone: this.contactsForm.controls.phone.value,
			email: this.contactsForm.controls.email.value
		};
	}

	constructor(private dialogRef: MatDialogRef<ContactsFormComponent>,
		private recaptchaService: RecaptchaService,
		@Inject(MAT_DIALOG_DATA) public contactsSubmit: ContactsSubmit) { }

	private resetFormState(): void {
		this.dialogRef.disableClose = false;
		this.isLoading = false;
		document.body.classList.remove('waiting');
		this.formTitle$.next('Ваши контакты');
	}

	private infromUserAboutSubmitState(): void {
		const recaptchaExecutingPreventer: Subject<void> = new Subject<void>();

		this.recaptchaService.isRecaptchaCanceled$.pipe(takeUntil(this.dialogRef.afterClosed())).subscribe(() => {
			this.resetFormState();
			recaptchaExecutingPreventer.next();
			recaptchaExecutingPreventer.complete();
		});

		this.recaptchaService.isRecaptchaExecuting$
			.pipe(
				takeUntil(this.dialogRef.afterClosed()),
				takeUntil(recaptchaExecutingPreventer),
				tap(() => {
					this.dialogRef.disableClose = true;
					this.isLoading = true;
					this.formTitle$.next('Проверка на робота...');
				}),
				switchMap(() => this.recaptchaService.recaptcha$),
				switchMap((recaptcha: RecaptchaComponent) => recaptcha.resolved),
				tap((recaptchaKey: string) => {
					document.body.classList.add('waiting');
					this.contactsForm.disable();
					this.formTitle$.next('Отправка запроса...');
				}),
			).subscribe();
	}

	public submitForm(): void {
		this.infromUserAboutSubmitState();
		const submitType: SubmitType = this.contactsSubmit.type;

		this.contactsSubmit.method(this.userContacts)
			.pipe(
				take(1),
				takeUntil(this.dialogRef.afterClosed()),
				tap(() => {
					document.body.classList.remove('waiting');
				})
			)
			.subscribe(
				(response: EmailJSResponseStatus) => {
					const submitStatus: SubmitStatus = { success: true, submitType };
					this.dialogRef.close(submitStatus);
				},
				(error: EmailJSResponseStatus) => {
					const submitStatus: SubmitStatus = { success: false, submitType };
					this.dialogRef.close(submitStatus);
				}
			);
	}
}
