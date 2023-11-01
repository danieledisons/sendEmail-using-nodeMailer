const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
  "147677649419-9ghcl755t3q71j16ah71rd8tcdh5lj0a.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04A8o3zzbLVvYCgYIARAAGAQSNwF-L9IrYGJ4FuyjDORJBjzc2HxJMzXS9JOVwdifI8FIiRVorKZNrDA4lKX-jaECHH1AR_Jo4eE";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

console.log(200000, oAuth2Client);

async function sendMail() {
  try {
    // const accessToken = await oAuth2Client.getAccessToken();

    const accessToken =
      "ya29.a0AfB_byASuzQIyBeSchpe-Bbd9AIvUMmfGFkpN8iJbi9RfV8IAre7ozo_vf6bT66iFAIRbbh07kJicTxjlzA41OTaXx89sYouSNAxXxVJJjhONvNgR_J-cM-EhvoMhbuUBm_41QvAjPmLythL4PE6zCGWxPl0DadFP3ntaCgYKAXwSARASFQGOcNnCT4ssUno4_9KD_Fz_6P3Pbg0171";

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
        refresh_token: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "Daniel Automated Email Sender <danieledison129@gmail.com>",
      to: "kanalt2700@gmail.com",
      subject: "hello from Daniel Automated Email Sender",
      text: "Testing Testing Hello from Daniel Automated Email Sender",
      html: "<h1>222Testing Testing Hello from Daniel Automated Email Sender</h1",
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
