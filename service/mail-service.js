import dotenv from "dotenv";
import nodemailer from "nodemailer";
import {google} from "googleapis";
dotenv.config()

const CLIENT_ID = "716515016489-p4gsnnatlunq7vdk2igii1uu3h1qs224.apps.googleusercontent.com";
const CLIENT_SECRET =  "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//0486VXkkvKCmDCgYIARAAGAQSNwF-L9Iry-XjQCf5pszEQVHYcVJwaDYlaJXVheczfs4bHxdLs3q2x9Ud5yY5lG-BOZysiWveDtQ";
const USER_EMAIL = "sunet.operator@gmail.com";


const OAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
OAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

class MailService {
  accessToken = "";
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: USER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: this.accessToken,
      },
    })
  }

  async generateToken () {
    this.accessToken = await OAuth2Client.getAccessToken();
  }

  async sendContactEmail (mail) {
    try {
      await this.generateToken();
      await this.transporter.sendMail(mail)
    } catch (err) {
      console.log(err);
      throw new Error("An Error Occurred while sending contact email!");
    }
  }
}

const mailService = new MailService();

export default mailService;
