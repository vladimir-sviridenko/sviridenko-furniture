import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Email } from '@shop/models/enums/email.enum';
import { EmailParams } from '@shop/models/email-params';
import { UserContacts } from '@shop/models/user-contacts';
import { Cart } from '@shop/models/cart';
import { HTMLGeneratorService } from './html-generator.service';

@Injectable()
export class EmailService {

	private serviceId: string = 'gmail';
	private userId: string = 'user_QZnzCIxRa5wxvW6sLg46x';
	private templateId: string = 'main';
	private sendTo: string = Email.Developer;
	private sendCopyTo: string = '';

	constructor(private htmlGenerator: HTMLGeneratorService) {}

	public sendErrorMessage(error: Error): Promise<EmailJSResponseStatus> {
		const htmlMessage: string = this.htmlGenerator.getErrorHtml(error).outerHTML;
		const emailParams: EmailParams = {
			subject: 'Uncaught Error!',
			sendTo: Email.Developer,
			sendCopyTo: this.sendCopyTo,
			htmlMessage
		};
		return emailjs.send(this.serviceId, this.templateId, emailParams, this.userId);
	}

	public sendCallRequest(user: UserContacts, targetPhotoUrl: string): Promise<EmailJSResponseStatus> {
		const htmlMessage: string = this.htmlGenerator.getRequestCallMessageHtml(user, targetPhotoUrl).outerHTML;

		const emailParams: EmailParams = {
			subject: 'Клиент запросил звонок!',
			sendTo: this.sendTo,
			sendCopyTo: this.sendCopyTo,
			htmlMessage
		};
		return emailjs.send(this.serviceId, this.templateId, emailParams, this.userId);
	}

	public sendOrderConfirmation(user: UserContacts, cart: Cart): Promise<EmailJSResponseStatus> {
		const htmlMessage: string = this.htmlGenerator.getOrderConfirmationMessageHtml(cart).outerHTML;

		const emailParams: EmailParams = {
			subject: 'Ваш заказ мебели',
			sendTo: user.email,
			sendCopyTo: this.sendCopyTo,
			htmlMessage
		};
		return emailjs.send(this.serviceId, this.templateId, emailParams, this.userId);
	}

	public sendOrder(user: UserContacts, cart: Cart): Promise<EmailJSResponseStatus> {
		const htmlMessage: string = this.htmlGenerator.getOrderMessageHtml(user, cart).outerHTML;

		const emailParams: EmailParams = {
			subject: 'Новый заказ!',
			sendTo: this.sendTo,
			sendCopyTo: this.sendCopyTo,
			htmlMessage
		};
		return emailjs.send(this.serviceId, this.templateId, emailParams, this.userId);
	}
}
