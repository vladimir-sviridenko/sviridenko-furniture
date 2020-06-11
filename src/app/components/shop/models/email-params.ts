export interface EmailParams {
	subject: string;
	sendTo: string;
	sendCopyTo?: string;
	htmlMessage: string;
}
