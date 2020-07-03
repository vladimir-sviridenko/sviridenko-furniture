import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Email } from '@shop/models/enums/email.enum';
import { EmailParams } from '@shop/models/email-params';
import { UserContacts } from '@shop/models/user-contacts';
import { Cart } from '@shop/models/cart';
import { HTMLGeneratorService } from './html-generator.service';
import { RecaptchaService } from 'src/app/services/recaptcha.service';
import { RecaptchaComponent } from 'ng-recaptcha';
import { take, filter, switchMap, tap, catchError } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';
import { EmailTemplate } from '@shop/models/enums/email-template.enum';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EmailService {

	private sendTo: string = Email.Developer;
	private sendCopyTo: string = 'vladimirsviridenko1998@gmail.com';

	constructor(private htmlGenerator: HTMLGeneratorService, private http: HttpClient) {}

	public sendEmail(emailParams: EmailParams): Observable<string> {
		const headers: HttpHeaders = new HttpHeaders();
		headers.set('Content-Type', 'application/json');
		this.http.post('/api/send-email', { subject: emailParams.subject, send_to: emailParams.sendTo, send_copy_to: this.sendCopyTo, html_message: '<html><body>'+emailParams.htmlMessage+ '</body></html>'}, { headers }).subscribe((response) => {
			console.log(response);
		});

		return of('1');
	}

	public sendErrorMessage(error: Error): Observable<string> {
		const htmlMessage: string = this.htmlGenerator.getErrorHtml(error).outerHTML;
		const emailParams: EmailParams = {
			subject: 'Uncaught Error!',
			sendTo: Email.Developer,
			sendCopyTo: this.sendCopyTo,
			htmlMessage
		};
		return this.sendEmail(emailParams);
	}

	public sendCallRequest(user: UserContacts, targetPhotoUrl: string): Observable<string> {
		const htmlMessage: string = this.htmlGenerator.getRequestCallMessageHtml(user, targetPhotoUrl).outerHTML;
		const emailParams: EmailParams = {
			subject: 'Клиент запросил звонок!',
			sendTo: this.sendTo,
			sendCopyTo: this.sendCopyTo,
			htmlMessage
		};
		return this.sendEmail(emailParams);
	}

	public sendOrderConfirmation(user: UserContacts, cart: Cart): Observable<string> {
		const htmlMessage: string = this.htmlGenerator.getOrderConfirmationMessageHtml(cart).outerHTML;
		const emailParams: EmailParams = {
			subject: 'Ваш заказ мебели',
			sendTo: user.email,
			sendCopyTo: this.sendCopyTo,
			htmlMessage
		};
		return this.sendEmail(emailParams);
	}

	public sendOrder(user: UserContacts, cart: Cart): Observable<string> {
		const htmlMessage: string = this.htmlGenerator.getOrderMessageHtml(user, cart).outerHTML;
		const emailParams: EmailParams = {
			subject: 'Новый заказ!',
			sendTo: this.sendTo,
			sendCopyTo: this.sendCopyTo,
			htmlMessage
		};
		return this.sendEmail(emailParams);
	}
}
