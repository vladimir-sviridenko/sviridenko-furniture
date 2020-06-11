import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailService } from '@shop/services/email.service';
import { UserContacts } from '@shop/models/user-contacts';

@Component({
	selector: 'app-request-call',
	templateUrl: './request-call.component.html',
	styleUrls: ['./request-call.component.scss']
})
export class RequestCallComponent {

	public isLoading: boolean = false;

	public requestCallForm: FormGroup = new FormGroup({
		userName: new FormControl('', [Validators.required, Validators.pattern('^(?!\\s*$).+')]),
		userPhone: new FormControl('', [Validators.required, Validators.pattern('^((\\+7|7|8)+([0-9]){10})$')]),
		userEmail: new FormControl('', [Validators.required, Validators.pattern('.+@.+\\..+')])
	});

	constructor(private emailService: EmailService,
							private dialogRef: MatDialogRef<RequestCallComponent>,
							@Inject(MAT_DIALOG_DATA) public targetPhotoUrl: string) { }

	get userContacts(): UserContacts {
		return {
			name: this.requestCallForm.controls.userName.value,
			phone: this.requestCallForm.controls.userPhone.value,
			email: this.requestCallForm.controls.userEmail.value
		};
	}

	public requestCall(event: Event): void {
		this.dialogRef.disableClose = true;
		this.isLoading = true;
		this.emailService.sendCallRequest(this.userContacts, this.targetPhotoUrl)
			.then(() => {
				this.dialogRef.close(true);
				this.isLoading = false;
			})
			.catch(() => {
				this.dialogRef.close(false);
			});
	}
}
