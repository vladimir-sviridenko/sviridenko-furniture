import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { ContactsFormComponent } from '@shop/components/contacts-form/contacts-form.component';
import { UserContacts } from '@shop/models/user-contacts';
import { EmailJSResponseStatus } from 'emailjs-com';
import { take } from 'rxjs/operators';
import { CartFacadeService } from '@store/facades/cart.facade';

@Injectable()
export class DialogService {

	constructor(private dialog: MatDialog,
							private requestStatusTip: MatSnackBar,
							private overlay: Overlay,
							private cartFacadeService: CartFacadeService) {}

	public openContactsDialog(submitMethod: (contacts: UserContacts) => Promise<EmailJSResponseStatus>): void {
		const dialogRef: MatDialogRef<ContactsFormComponent> = this.dialog.open(ContactsFormComponent, {
			width: '320px',
			scrollStrategy: this.overlay.scrollStrategies.noop(),
			data: submitMethod,
			maxHeight: '90vh'
		});

		dialogRef.afterClosed().pipe(take(1)).subscribe((requestSuccess: boolean | undefined) => {
			if (requestSuccess !== undefined) {
				this.cartFacadeService.closeCart();
				requestSuccess
					? this.requestStatusTip.open('Запрос успешно отправлен', 'Ок', {
						duration: 5000
					})
					: this.requestStatusTip.open('Ошибка запроса', 'Ок', {
						duration: 5000
					});
			} else {  // when dialog closed by user
				return;
			}
		});
	}
}
