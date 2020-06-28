import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Email } from '@shop/models/enums/email.enum';
import { EmailParams } from '@shop/models/email-params';
import { UserContacts } from '@shop/models/user-contacts';
import { Cart } from '@shop/models/cart';
import { HTMLGeneratorService } from './html-generator.service';
import { RecaptchaService } from 'src/app/services/recaptcha.service';
import { RecaptchaComponent } from 'ng-recaptcha';
import { take, filter, switchMap, tap, delay } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { EmailTemplate } from '@shop/models/enums/email-template.enum';
import { CdkVirtualForOf } from '@angular/cdk/scrolling';

@Injectable()
export class EmailService {

	private serviceId: string = 'gmail';
	private userId: string = 'user_QZnzCIxRa5wxvW6sLg46x';
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

	public sendEmail(emailParams: EmailParams): Observable<EmailJSResponseStatus> {
		return from(emailjs.send(this.serviceId, EmailTemplate.NoCaptcha, emailParams, this.userId));
	}

	public sendRecaptchedEmail(emailParams: EmailParams): Observable<EmailJSResponseStatus> {
		this.recaptcha.execute();
		this.recaptchaService.isRecaptchaExecuting$.next(true);
		this.setRecaptchaStyles();
		return this.recaptcha.resolved.pipe(
			take(1),
			switchMap(() => {
				// debug
				//return from(Promise.resolve(1) as unknown as Promise<EmailJSResponseStatus>);
				// prod
				return from(emailjs.send(this.serviceId, EmailTemplate.Main, emailParams, this.userId));
			}),
			tap(() => this.recaptcha.reset())
		);
	}

	public setRecaptchaStyles(): void {
		const recaptchaIframe: HTMLElement = document.querySelector('iframe[title="recaptcha challenge"]');
		if (recaptchaIframe) {
			const recaptchaContainer: HTMLElement = recaptchaIframe.parentElement;
			recaptchaContainer.classList.add('recaptcha__challenge-container');
			const overlay: HTMLElement = recaptchaContainer.previousElementSibling as HTMLElement;
			overlay.onclick = () => {
				this.recaptchaService.isRecaptchaCanceled$.next();
			};
		}
	}

	public sendErrorMessage(error: Error): Observable<EmailJSResponseStatus> {
		const htmlMessage: string = this.htmlGenerator.getErrorHtml(error).outerHTML;
		const emailParams: EmailParams = {
			subject: 'Uncaught Error!',
			sendTo: Email.Developer,
			sendCopyTo: this.sendCopyTo,
			htmlMessage
		};
		return this.sendEmail(emailParams);
	}

	public sendCallRequest(user: UserContacts, targetPhotoUrl: string): Observable<EmailJSResponseStatus> {
		const htmlMessage: string = this.htmlGenerator.getRequestCallMessageHtml(user, targetPhotoUrl).outerHTML;
		const emailParams: EmailParams = {
			subject: 'Клиент запросил звонок!',
			sendTo: this.sendTo,
			sendCopyTo: this.sendCopyTo,
			htmlMessage
		};
		return this.sendRecaptchedEmail(emailParams);
	}

	public sendOrderConfirmation(user: UserContacts, cart: Cart): Observable<EmailJSResponseStatus> {
		const htmlMessage: string = this.htmlGenerator.getOrderConfirmationMessageHtml(cart).outerHTML;
		const emailParams: EmailParams = {
			subject: 'Ваш заказ мебели',
			sendTo: user.email,
			sendCopyTo: this.sendCopyTo,
			htmlMessage
		};
		return this.sendRecaptchedEmail(emailParams);
	}

	public sendOrder(user: UserContacts, cart: Cart): Observable<EmailJSResponseStatus> {
		const htmlMessage: string = this.htmlGenerator.getOrderMessageHtml(user, cart).outerHTML;
		const emailParams: EmailParams = {
			subject: 'Новый заказ!',
			sendTo: this.sendTo,
			sendCopyTo: this.sendCopyTo,
			htmlMessage
		};
		return this.sendRecaptchedEmail(emailParams);
	}
}
