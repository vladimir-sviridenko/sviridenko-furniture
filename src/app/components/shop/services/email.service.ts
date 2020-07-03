import { Injectable } from '@angular/core';
import { Email } from '@shop/models/enums/email.enum';
import { EmailParams } from '@shop/models/email-params';
import { UserContacts } from '@shop/models/user-contacts';
import { Cart } from '@shop/models/cart';
import { HTMLGeneratorService } from './html-generator.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EmailService {

	private sendTo: string = Email.Developer;

	constructor(private htmlGenerator: HTMLGeneratorService, private http: HttpClient) {}

	public sendEmail({ subject, send_to, html_message }: EmailParams): Observable<string> {
		const headers: HttpHeaders = new HttpHeaders();
		headers.set('Content-Type', 'application/json');
		return this.http.post('/api/send-email', { subject, send_to, html_message }, { headers }) as Observable<string>;
	}

	public sendErrorMessage(error: Error): Observable<string> {
		const html_message: string = this.htmlGenerator.getErrorHtml(error).outerHTML;
		const emailParams: EmailParams = {
			subject: 'Uncaught Error!',
			send_to: Email.Developer,
			html_message
		};
		return this.sendEmail(emailParams);
	}

	public sendCallRequest(user: UserContacts, targetPhotoUrl: string): Observable<string> {
		const html_message: string = this.htmlGenerator.getRequestCallMessageHtml(user, targetPhotoUrl).outerHTML;
		const emailParams: EmailParams = {
			subject: 'Клиент запросил звонок!',
			send_to: this.sendTo,
			html_message
		};
		return this.sendEmail(emailParams);
	}

	public sendOrderConfirmation(user: UserContacts, cart: Cart): Observable<string> {
		const html_message: string = this.htmlGenerator.getOrderConfirmationMessageHtml(cart).outerHTML;
		const emailParams: EmailParams = {
			subject: 'Ваш заказ мебели',
			send_to: user.email,
			html_message
		};
		return this.sendEmail(emailParams);
	}

	public sendOrder(user: UserContacts, cart: Cart): Observable<string> {
		const html_message: string = this.htmlGenerator.getOrderMessageHtml(user, cart).outerHTML;
		const emailParams: EmailParams = {
			subject: 'Новый заказ!',
			send_to: this.sendTo,
			html_message
		};
		return this.sendEmail(emailParams);
	}
}
