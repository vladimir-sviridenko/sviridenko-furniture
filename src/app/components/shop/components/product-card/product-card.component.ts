import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '@shop/models/product';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { take } from 'rxjs/internal/operators/take';
import { CartFacadeService } from '@store/facades/cart.facade';
import { CartProduct } from '@shop/models/cart-product';
import { ContactsFormComponent } from '../contacts-form/contacts-form.component';
import { ContactsFormType } from '@shop/models/enums/contacts-form-type';
import { EmailJSResponseStatus } from 'emailjs-com';
import { UserContacts } from '@shop/models/user-contacts';
import { EmailService } from '@shop/services/email.service';

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {

	@Input()
	public product: Product;

	@Input()
	public albumId: number;

	@Output()
	public imageLoad: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(private dialog: MatDialog,
							private requestStatusTip: MatSnackBar,
							private overlay: Overlay,
							private emailService: EmailService,
							private cartFacadeService: CartFacadeService) {}

	public addProductToCart(): void {
		const cartProduct: CartProduct = new CartProduct(this.product);
		this.cartFacadeService.addCartProduct(cartProduct);
	}

	public openRequestCallDialog(): void {
		const submitMethod: (contacts: UserContacts) => Promise<EmailJSResponseStatus> = (contacts: UserContacts) => {
			return this.emailService.sendCallRequest.call(this.emailService, contacts, this.product.photoUrl.low);
		};
		const dialogRef: MatDialogRef<ContactsFormComponent> = this.dialog.open(ContactsFormComponent, {
			width: '320px',
			scrollStrategy: this.overlay.scrollStrategies.noop(),
			data: submitMethod,
			maxHeight: '90vh'
		});

		dialogRef.afterClosed().pipe(take(1)).subscribe((requestSuccess: boolean | undefined) => {
			if (requestSuccess !== undefined) {
				requestSuccess
					? this.requestStatusTip.open('Запрос успешно отправлен', 'Ок', {
						duration: 5000
					})
					: this.requestStatusTip.open('Ошибка запроса', 'Ок', {
						duration: 10000
					});
			} else {  // when dialog closed by user
				return;
			}
		});
	}
}
