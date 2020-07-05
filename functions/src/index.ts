import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Request, Response } from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import Mail = require('nodemailer/lib/mailer');
import { SentMessageInfo } from 'nodemailer/lib/smtp-pool';
import { IMailOptions } from './interfaces/IMailOptions';
const cors: any = require('cors')({ origin: true });

admin.initializeApp();

const transporter: Mail = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'sviridenkofurniture.robot@gmail.com',
		pass: 'robot998877'
	}
});

exports.sendEmail = functions.https.onRequest((request: Request, response: Response) => {
	cors(request, response, () => {
		const mailOptions: IMailOptions = request.body;
		return transporter.sendMail(mailOptions, (error: Error | null, info: SentMessageInfo) => {
			return Boolean(error) ? response.status(400).send(JSON.stringify(error)) : response.send(JSON.stringify(info));
		});
	});
});
