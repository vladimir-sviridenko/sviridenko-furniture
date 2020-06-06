import { Injectable } from '@angular/core';
import { EmailTemplate } from '@shop/models/enums/EmailTemplate';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable()
export class EmailService {

	private serviceId: string = 'gmail';
	private userId: string = 'user_QZnzCIxRa5wxvW6sLg46x';

	public sendForm(emailTemplate: EmailTemplate, form: HTMLFormElement): Promise<EmailJSResponseStatus> {
		return emailjs.sendForm(this.serviceId, emailTemplate, form, this.userId);
	}
}
