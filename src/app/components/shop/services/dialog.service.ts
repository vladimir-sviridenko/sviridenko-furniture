import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { ContactsFormComponent } from '@shop/components/contacts-form/contacts-form.component';
import { take, last, takeUntil } from 'rxjs/operators';
import { CartFacadeService } from '@store/facades/cart.facade';
import { ContactsComponent } from '@shop/components/contacts/contacts.component';
import { BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { PhotoUrl } from '@shop/models/photo-url';
import { FullPhotoComponent } from '@shop/components/full-photo/full-photo.component';
import { SubmitStatus } from '@shop/models/submit-status';
import { ContactsSubmit } from '@shop/models/contacts-submit';
import { SubmitType } from '@shop/models/enums/submit-type.enum';
import { ConfirmDialogComponent } from '@shop/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogText } from '@shop/models/confirm-dialog';

@Injectable()
export class DialogService {

	constructor(private dialog: MatDialog,
		private statusTip: MatSnackBar,
		private overlay: Overlay,
		private breakpointObserver: BreakpointObserver,
		private cartFacadeService: CartFacadeService) { }

	private get onMobileResize$(): Observable<BreakpointState> {
		return this.breakpointObserver.observe([
			'(min-width: 600px)',
		]);
	}

	public openConfirmDialog(dialogText: ConfirmDialogText): Observable<boolean> {
		const dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, {
			width: '250px',
			scrollStrategy: this.overlay.scrollStrategies.noop(),
			restoreFocus: false,
			autoFocus: false,
			data: dialogText,
			maxHeight: '90vh',
			maxWidth: '95vw'
		});

		return dialogRef.afterClosed().pipe(take(1));
	}

	public openContactsForm(contactsSubmit: ContactsSubmit): void {
		const dialogRef: MatDialogRef<ContactsFormComponent> = this.dialog.open(ContactsFormComponent, {
			width: '320px',
			scrollStrategy: this.overlay.scrollStrategies.noop(),
			restoreFocus: false,
			data: contactsSubmit,
			maxHeight: '90vh',
			maxWidth: '95vw'
		});

		dialogRef.afterClosed().pipe(take(1)).subscribe((submitStatus: SubmitStatus | undefined) => {
			if (submitStatus !== undefined) { // dialog wasn't closed by user
				if (submitStatus.success) {
					switch (submitStatus.submitType) {
						case SubmitType.MakeOrder:
							this.cartFacadeService.closeCart();
							setTimeout(() => {
								this.cartFacadeService.clearCart();
							}, Number('300'));
							this.statusTip.open('Заказ успешно выполнен', 'Ок', { duration: 5000 })
								.afterDismissed()
								.subscribe(() => {
									this.statusTip.open('Расчётный лист отправлен на указанную почту', 'Ок', { duration: 5000 });
								});
							break;
						case SubmitType.RequestCall:
							this.statusTip.open('Запрос успешно отправлен', 'Ок', {
								duration: 5000
							});
							break;
					}
				} else {
					this.statusTip.open('Ошибка запроса', 'Ок', {
						duration: 5000
					});
				}
			}
		});
	}

	public openHeaderContacts(): void {
		const dialogRef: MatDialogRef<ContactsComponent> = this.dialog.open(ContactsComponent, {
			width: '270px',
			scrollStrategy: this.overlay.scrollStrategies.noop(),
			restoreFocus: false,
			autoFocus: false,
			panelClass: 'dialog_contacts',
			maxHeight: '90vh'
		});

		this.onMobileResize$.pipe(take(2), last(), takeUntil(dialogRef.afterClosed())).subscribe(() => {
			dialogRef.close();
		});
	}

	public openPhoto(photoUrl: PhotoUrl): void {
		let isDesktop: boolean;
		this.onMobileResize$.pipe(take(1)).subscribe((breakpointState: BreakpointState) => {
			isDesktop = breakpointState.matches;
		});

		this.dialog.open(FullPhotoComponent, {
			scrollStrategy: this.overlay.scrollStrategies.noop(),
			panelClass: 'dialog_full-photo',
			backdropClass: 'dialog_full-photo-background',
			restoreFocus: false,
			maxHeight: '90vh',
			maxWidth: '90vw',
			data: isDesktop ? photoUrl.high : photoUrl.low,
		});
	}
}
