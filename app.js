const nodemailer = require("nodemailer");
const { google } = require("googleapis");

require("dotenv").config();

const OAuth2 = google.auth.OAuth2;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(
  receivingEmail,
  sendername = "Email Bot",
  textmessage = "Hurray! You are receiving a mail from Daniel's Automated Email Sender."
) {
  try {
    const accessToken = await new Promise((resolve, reject) => {
      oAuth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("Failed to create access token :(");
        }
        resolve(token);
      });
    });
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "Oauth2",
        user: "danieledison129@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "Daniel Automated Email Sender <danieledison129@gmail.com>",
      to: receivingEmail,
      subject: `${sendername} Hello from Daniel Automated Email Sender, This message is sent from ${sendername}`,
      text: "Testing Testing Hello from Daniel Automated Email Sender",
      html: `<h2>${textmessage}</h2>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log("email is sent", result))
  .catch((error) => console.log(error.message));

module.exports = { sendMail };
