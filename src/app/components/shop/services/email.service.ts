import { Injectable } from '@angular/core';
import { Email } from '@shop/models/enums/email.enum';
import { MailOptions } from '@shop/models/mail-options';
import { UserContacts } from '@shop/models/user-contacts';
import { Cart } from '@shop/models/cart';
import { HTMLGeneratorService } from './html-generator.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SentMessageInfo } from 'nodemailer/lib/smtp-pool';

@Injectable()
export class EmailService {

	private sendFrom: string = 'Sviridenko Furniture <sviridenkofurniture.robot@gmail.com>';
	private sendTo: string = Email.Developer;
	private apiBaseHref: string = 'https://us-central1-sviridenko-furniture.cloudfunctions.net';

	constructor(private htmlGenerator: HTMLGeneratorService, private http: HttpClient) { }

	public sendEmail(mailOptions: MailOptions): Observable<SentMessageInfo> {
		const headers: HttpHeaders = new HttpHeaders();
		headers.set('Access-Control-Allow-Origin', '*');
		headers.set('Content-Type', 'application/json');
		return this.http.post(`${this.apiBaseHref}/sendMail`, mailOptions, { headers }) as Observable<SentMessageInfo>;
	}

	public sendErrorMessage(error: Error): Observable<SentMessageInfo> {
		const html: string = this.htmlGenerator.getErrorHtml(error).outerHTML;
		const mailOptions: MailOptions = {
			from: this.sendFrom,
			to: Email.Developer,
			subject: 'Uncaught Error!',
			html
		};
		return this.sendEmail(mailOptions);
	}

	public sendCallRequest(user: UserContacts, targetPhotoUrl: string): Observable<SentMessageInfo> {
		const mailOptions: MailOptions = {
			from: this.sendFrom,
			to: this.sendTo,
			subject: 'Клиент запросил звонок!',
			html: this.htmlGenerator.getRequestCallMessageHtml(user, targetPhotoUrl).outerHTML
		};
		return this.sendEmail(mailOptions);
	}

	public sendOrderConfirmation(user: UserContacts, cart: Cart): Observable<SentMessageInfo> {
		const mailOptions: MailOptions = {
			from: this.sendFrom,
			to: user.email,
			subject: 'Ваш заказ мебели',
			html: this.htmlGenerator.getOrderConfirmationMessageHtml(cart).outerHTML
		};
		return this.sendEmail(mailOptions);
	}

	public sendOrder(user: UserContacts, cart: Cart): Observable<SentMessageInfo> {
		const mailOptions: MailOptions = {
			from: this.sendFrom,
			subject: 'Новый заказ!',
			to: this.sendTo,
			html: this.htmlGenerator.getOrderMessageHtml(user, cart).outerHTML
		};
		return this.sendEmail(mailOptions);
	}
}
