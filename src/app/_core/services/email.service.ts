import { Injectable } from '@angular/core';
import { EmailTemplate } from '@models/enums/EmailTemplates';
import emailjs from 'emailjs-com';

@Injectable()
export class EmailService {

  private serviceId: string = 'gmail';
  private userId: string = 'user_QZnzCIxRa5wxvW6sLg46x';

  constructor() { }

  public sendForm(emailTemplate: EmailTemplate, form: HTMLFormElement) {
    return emailjs.sendForm(this.serviceId, emailTemplate, form, this.userId);
  }
}
