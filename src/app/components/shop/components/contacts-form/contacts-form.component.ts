import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserContacts } from '@shop/models/user-contacts';
import { BehaviorSubject } from 'rxjs';
import { SubmitType } from '@shop/models/enums/submit-type.enum';
import { SubmitStatus } from '@shop/models/submit-status';
import { ContactsSubmit } from '@shop/models/contacts-submit';
import { take, takeUntil, finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { SentMessageInfo } from 'nodemailer/lib/smtp-pool';

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
		@Inject(MAT_DIALOG_DATA) public contactsSubmit: ContactsSubmit) { }

	private resetFormState(): void {
		this.dialogRef.disableClose = false;
		document.body.classList.remove('waiting');
		this.isLoading = false;
		this.contactsForm.enable();
		this.formTitle$.next('Ваши контакты');
	}

	private disableForm(): void {
		this.dialogRef.disableClose = true;
		document.body.classList.add('waiting');
		this.isLoading = true;
		this.contactsForm.disable();
		this.formTitle$.next('Отправка запроса...');
	}

	public submitForm(): void {
		this.disableForm();
		const submitType: SubmitType = this.contactsSubmit.type;

		this.contactsSubmit.method(this.userContacts)
			.pipe(
				take(1),
				takeUntil(this.dialogRef.afterClosed()),
				finalize(() => {
					document.body.classList.remove('waiting');
				})
			)
			.subscribe(
				(response: SentMessageInfo) => {
					const submitStatus: SubmitStatus = { success: true, submitType };
					this.dialogRef.close(submitStatus);
				},
				(error: HttpErrorResponse | Error) => {
					const submitStatus: SubmitStatus = { success: false, submitType };
					this.dialogRef.close(submitStatus);
				}
			);
	}
}
