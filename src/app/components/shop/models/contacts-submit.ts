import { UserContacts } from './user-contacts';
import { SubmitType } from './enums/submit-type.enum';
import { Observable } from 'rxjs';
import { SentMessageInfo } from 'nodemailer/lib/smtp-pool';

export interface ContactsSubmit {
	type: SubmitType;
	method: (contacts: UserContacts) => Observable<SentMessageInfo>;
}
