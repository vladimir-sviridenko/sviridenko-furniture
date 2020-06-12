import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailService } from '@shop/services/email.service';
import { UserContacts } from '@shop/models/user-contacts';
import { ContactsDialogData } from '@shop/models/contacts-dialog-data';
import { ContactsFormType } from '@shop/models/enums/contacts-form-type';
import { Cart } from '@shop/models/cart-product-pools';
import { EmailJSResponseStatus } from 'emailjs-com';

@Component({
	selector: 'app-contacts-form',
	templateUrl: './contacts-form.component.html',
	styleUrls: ['./contacts-form.component.scss']
})
export class ContactsFormComponent implements OnInit {

	public isLoading: boolean = false;

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

	public submit: () => Promise<EmailJSResponseStatus>;

	constructor(private emailService: EmailService,
							private dialogRef: MatDialogRef<ContactsFormComponent>,
							@Inject(MAT_DIALOG_DATA) public dialogData: ContactsDialogData) { }

	public ngOnInit(): void {
		if (this.dialogData.formType === ContactsFormType.RequestCall) {
			this.submit = () => this.emailService.sendCallRequest(this.userContacts, this.dialogData.data as string);
		} else if (this.dialogData.formType === ContactsFormType.MakeOrder) {
			this.submit = () => this.emailService.sendOrder(this.userContacts, this.dialogData.data as Cart);
		}
	}

	public submitForm(event: Event): void {
		this.contactsForm.disable();
		this.dialogRef.disableClose = true;
		this.isLoading = true;
		this.submit()
			.then(() => {
				this.dialogRef.close(true);
			})
			.catch(() => {
				this.dialogRef.close(false);
			});
	}
}
