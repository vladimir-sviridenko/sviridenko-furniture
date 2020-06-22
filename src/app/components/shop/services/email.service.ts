import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Email } from '@shop/models/enums/email.enum';
import { EmailParams } from '@shop/models/email-params';
import { UserContacts } from '@shop/models/user-contacts';
import { Cart } from '@shop/models/cart';
import { HTMLGeneratorService } from './html-generator.service';
import { RecaptchaService } from 'src/app/services/recaptcha.service';
import { RecaptchaComponent } from 'ng-recaptcha';
import { take, filter, map, switchMap, tap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

@Injectable()
export class EmailService {

	private serviceId: string = 'gmail';
	private userId: string = 'user_QZnzCIxRa5wxvW6sLg46x';
	private templateId: string = 'main';
	private sendTo: string = Email.Developer;
	private sendCopyTo: string = '';

	private recaptcha: RecaptchaComponent;

	constructor(private htmlGenerator: HTMLGeneratorService, private recaptchaService: RecaptchaService) {
		this.recaptchaService.recaptcha$
		.pipe(
			filter((recaptcha: RecaptchaComponent) => Boolean(recaptcha)),
			take(1)
		)
		.subscribe((recaptcha: RecaptchaComponent) => {
			this.recaptcha = recaptcha;
		});
	}

	public sendResolvedEmail(emailParams: EmailParams): Observable<EmailJSResponseStatus> {
		this.recaptcha.execute();
		return this.recaptcha.resolved.pipe(
			take(1),
			switchMap(() => {
				return from(emailjs.send(this.serviceId, this.templateId, emailParams, this.userId));
			}),
			tap(() => this.recaptcha.reset())
		);
	}

	public sendErrorMessage(error: Error): Observable<EmailJSResponseStatus> {
		const htmlMessage: string = this.htmlGenerator.getErrorHtml(error).outerHTML;
		const emailParams: EmailParams = {
			subject: 'Uncaught Error!',
			sendTo: Email.Developer,
			sendCopyTo: this.sendCopyTo,
			htmlMessage
		};
		return from(emailjs.send(this.serviceId, this.templateId, emailParams, this.userId));
	}

	public sendCallRequest(user: UserContacts, targetPhotoUrl: string): Observable<EmailJSResponseStatus> {
		const htmlMessage: string = this.htmlGenerator.getRequestCallMessageHtml(user, targetPhotoUrl).outerHTML;
		const emailParams: EmailParams = {
			subject: 'Клиент запросил звонок!',
			sendTo: this.sendTo,
			sendCopyTo: this.sendCopyTo,
			htmlMessage
		};
		return this.sendResolvedEmail(emailParams);
	}

	public sendOrderConfirmation(user: UserContacts, cart: Cart): Observable<EmailJSResponseStatus> {
		const htmlMessage: string = this.htmlGenerator.getOrderConfirmationMessageHtml(cart).outerHTML;
		const emailParams: EmailParams = {
			subject: 'Ваш заказ мебели',
			sendTo: user.email,
			sendCopyTo: this.sendCopyTo,
			htmlMessage
		};
		return this.sendResolvedEmail(emailParams);
	}

	public sendOrder(user: UserContacts, cart: Cart): Observable<EmailJSResponseStatus> {
		const htmlMessage: string = this.htmlGenerator.getOrderMessageHtml(user, cart).outerHTML;
		const emailParams: EmailParams = {
			subject: 'Новый заказ!',
			sendTo: this.sendTo,
			sendCopyTo: this.sendCopyTo,
			htmlMessage
		};
		return this.sendResolvedEmail(emailParams);
	}
}
