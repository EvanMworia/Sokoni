import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	// port: 587,
	// secure: false, // true for port 465, false for other ports
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

export async function sendWelcomeEmail(recipient) {
	try {
		await transporter.sendMail({
			from: `Sokoni <${process.env.EMAIL_USER}>`,
			to: `${recipient}`,
			subject: `Thanks for registering `,
			html: `
                <h1>Hello and Welcome to Sokoni!</h1>
                <p>We’re excited to have you on board.</p><br/>
				<br/>
				<p>Whether you are just looking around or actively searching for your next purchase, Sokoni has you covered.</p>
                <p>E-commerce made simple it should be illegal, <br/>Best regards, Sokoni Team</p>
            `,
		});
	} catch (error) {
		console.error('Error while sending email', error);
	}
}
export async function sendOrderCreationEmail(recipient, appUserName, topic) {
	try {
		await transporter.sendMail({
			from: `ChanuaRaiya <${process.env.EMAIL_USER}>`,
			to: `${recipient}`,
			subject: `New Discussion Underway`,
			html: `
                <h1>Vipi ${appUserName}, Kam Changia Hii!</h1>
                <p>A new discussion on "${topic}" has been started</p><br/>
                <p>Tusho Unafeel aje kuhusu hii stori?, <br/>Na Usisahau Ku-ChanuaRaiya</p>
            `,
		});
	} catch (error) {
		console.error('Error while sending email', error);
	}
}
