import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Email } from '@shop/models/enums/email.enum';
import { EmailParams } from '@shop/models/email-params';
import { HTMLGenerator } from '@shop/models/html-generator';
import { UserContacts } from '@shop/models/user-contacts';
import { Cart } from '@shop/models/cart-product-pools';

@Injectable()
export class EmailService {

	private serviceId: string = 'gmail';
	private userId: string = 'user_QZnzCIxRa5wxvW6sLg46x';
	private templateId: string = 'main';
	private sendTo: string = Email.Developer;

	private htmlGenerator: HTMLGenerator = new HTMLGenerator();

	public sendErrorMessage(error: Error): Promise<EmailJSResponseStatus> {
		const htmlMessage: string = this.htmlGenerator.getErrorHtml(error).outerHTML;
		const emailParams: EmailParams = {
			subject: 'Uncaught Error!',
			sendTo: Email.Developer,
			htmlMessage
		};
		return emailjs.send(this.serviceId, this.templateId, emailParams, this.userId);
	}

	public sendCallRequest(userContacts: UserContacts, targetPhotoUrl: string): Promise<EmailJSResponseStatus> {
		const htmlMessage: string = this.htmlGenerator.getRequestCallHtml(userContacts, targetPhotoUrl).outerHTML;

		const emailParams: EmailParams = {
			subject: 'Клиент запросил звонок!',
			sendTo: this.sendTo,
			htmlMessage
		};
		return emailjs.send(this.serviceId, this.templateId, emailParams, this.userId);
	}

	public sendOrder(user: UserContacts, cart: Cart): Promise<EmailJSResponseStatus> {
		
	}
}
