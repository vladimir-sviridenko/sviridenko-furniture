import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { ContactsFormComponent } from '@shop/components/contacts-form/contacts-form.component';
import { UserContacts } from '@shop/models/user-contacts';
import { EmailJSResponseStatus } from 'emailjs-com';
import { take, last, map, tap } from 'rxjs/operators';
import { CartFacadeService } from '@store/facades/cart.facade';
import { ContactsComponent } from '@shop/components/contacts/contacts.component';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { PhotoUrl } from '@shop/models/photo-url';
import { FullPhotoComponent } from '@shop/components/full-photo/full-photo.component';

@Injectable()
export class DialogService {

	constructor(private dialog: MatDialog,
							private requestStatusTip: MatSnackBar,
							private overlay: Overlay,
							private breakpointObserver: BreakpointObserver,
							private cartFacadeService: CartFacadeService) {}

	private get mobileLayoutChange$(): Observable<BreakpointState> {
		return this.breakpointObserver.observe([
			'(min-width: 600px)',
		]);
	}

	public openContactsForm(submitMethod: (contacts: UserContacts) => Promise<EmailJSResponseStatus>): void {
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

	public openHeaderContacts(): void {
		const dialogRef: MatDialogRef<ContactsComponent> = this.dialog.open(ContactsComponent, {
			width: '270px',
			scrollStrategy: this.overlay.scrollStrategies.noop(),
			autoFocus: false,
			panelClass: 'dialog__contacts',
			maxHeight: '90vh'
		});

		this.mobileLayoutChange$.pipe(take(2), last()).subscribe(() => {
			dialogRef.close();
		});
	}

	public openPhoto(photoUrl: PhotoUrl): void {
		let isDesktop: boolean;
		this.mobileLayoutChange$.pipe(take(1)).subscribe((breakpointState: BreakpointState) => {
			isDesktop = breakpointState.matches;
		});

		this.dialog.open(FullPhotoComponent, {
			scrollStrategy: this.overlay.scrollStrategies.noop(),
			autoFocus: false,
			panelClass: 'dialog__full-photo',
			backdropClass: 'dialog__full-photo-background',
			data:	isDesktop ? photoUrl.high : photoUrl.low,
			maxHeight: '90vh'
		});
	}
}
