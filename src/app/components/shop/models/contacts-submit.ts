import { EmailJSResponseStatus } from 'emailjs-com';
import { UserContacts } from './user-contacts';
import { SubmitType } from './enums/submit-type.enum';

export interface ContactsSubmit {
	type: SubmitType;
	method: (contacts: UserContacts) => Promise<EmailJSResponseStatus[]>;
}
