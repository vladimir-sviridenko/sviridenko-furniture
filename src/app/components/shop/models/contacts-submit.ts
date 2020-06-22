import { EmailJSResponseStatus } from 'emailjs-com';
import { UserContacts } from './user-contacts';
import { SubmitType } from './enums/submit-type.enum';
import { Observable } from 'rxjs';

export interface ContactsSubmit {
	type: SubmitType;
	method: (contacts: UserContacts) => Observable<EmailJSResponseStatus>;
}
