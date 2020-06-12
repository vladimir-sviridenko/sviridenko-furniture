import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CartFacadeService } from '@store/facades/cart.facade';
import { OptionType } from '@shop/models/enums/option-type.enum';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { ContactsFormComponent } from '../contacts-form/contacts-form.component';
import { take } from 'rxjs/operators';
import { Cart } from '@shop/models/cart-product-pools';
import { ContactsFormType } from '@shop/models/enums/contacts-form-type';
import { EmailJSResponseStatus } from 'emailjs-com';
import { EmailService } from '@shop/services/email.service';
import { UserContacts } from '@shop/models/user-contacts';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {

	public optionTypeEnum: typeof OptionType = OptionType;

	constructor(private dialog: MatDialog,
							private requestStatusTip: MatSnackBar,
							private emailService: EmailService,
							private overlay: Overlay,
							public cartFacadeService: CartFacadeService) {}

	public openMakeOrderDialog(): void {
		let currentCart: Cart;
		this.cartFacadeService.cart$.pipe(take(1))
			.subscribe((cart: Cart) => {
				currentCart = cart;
			});

		const submitMethod: (contacts: UserContacts) => Promise<EmailJSResponseStatus> = (contacts: UserContacts) => {
			return this.emailService.sendOrder.call(this.emailService, contacts, currentCart);
		};

		const dialogRef: MatDialogRef<ContactsFormComponent> = this.dialog.open(ContactsFormComponent, {
			width: '320px',
			scrollStrategy: this.overlay.scrollStrategies.noop(),
			data: submitMethod,
			maxHeight: '90vh'
		});
	}
}
