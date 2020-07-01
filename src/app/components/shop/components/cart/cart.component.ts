import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CartFacadeService } from '@store/facades/cart.facade';
import { OptionType } from '@shop/models/enums/option-type.enum';
import { take, switchMap } from 'rxjs/operators';
import { Cart } from '@shop/models/cart';
import { EmailJSResponseStatus } from 'emailjs-com';
import { EmailService } from '@shop/services/email.service';
import { UserContacts } from '@shop/models/user-contacts';
import { DialogService } from '@shop/services/dialog.service';
import { ContactsSubmit } from '@shop/models/contacts-submit';
import { SubmitType } from '@shop/models/enums/submit-type.enum';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {

	public optionTypeEnum: typeof OptionType = OptionType;

	constructor(private dialogService: DialogService,
		private emailService: EmailService,
		public cartFacadeService: CartFacadeService) { }

	public openMakeOrderDialog(): void {
		let currentCart: Cart;
		this.cartFacadeService.cart$.pipe(take(1))
			.subscribe((cart: Cart) => {
				currentCart = cart;
			});

		const submitMethod: (contacts: UserContacts) => Observable<EmailJSResponseStatus> = (contacts: UserContacts) => {
			return this.emailService.sendOrder.call(this.emailService, contacts, currentCart)
				.pipe(
					switchMap(() => this.emailService.sendOrderConfirmation.call(this.emailService, contacts, currentCart))
				);
		};

		const contactsSubmit: ContactsSubmit = {
			type: SubmitType.MakeOrder,
			method: submitMethod
		};

		this.dialogService.openContactsForm(contactsSubmit);
	}
}
