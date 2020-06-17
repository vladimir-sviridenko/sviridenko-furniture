import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserContacts } from '@shop/models/user-contacts';
import { BehaviorSubject } from 'rxjs';
import { SubmitType } from '@shop/models/enums/submit-type.enum';
import { SubmitStatus } from '@shop/models/submit-status';
import { ContactsSubmit } from '@shop/models/contacts-submit';

@Component({
	selector: 'app-contacts-form',
	templateUrl: './contacts-form.component.html',
	styleUrls: ['./contacts-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsFormComponent {

	public isSubmiting$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

	public submitForm(): void {
		const submitType: SubmitType = this.contactsSubmit.type;
		this.contactsForm.disable();
		this.dialogRef.disableClose = true;
		this.isSubmiting$.next(true);
		this.isSubmiting$.complete();
		this.contactsSubmit.method(this.userContacts)
			.then(() => {
				const submitStatus: SubmitStatus = { success: true, submitType };
				this.dialogRef.close(submitStatus);
			})
			.catch(() => {
				const submitStatus: SubmitStatus = { success: false, submitType };
				this.dialogRef.close(false);
			});
	}
}
