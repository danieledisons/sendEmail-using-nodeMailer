const express = require("express");
const cors = require("cors");

const app = express();

const { sendMail } = require("./app");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("use /send/:email to send email...");
});

app.get("/send/:email", async (req, res) => {
  try {
    if (req.params.email) {
      // const info = await sendMail(req.params.email);
      // // res.send(info);
      // res.json(data);
      res.send("404 use a post request");
    }
  } catch (error) {
    res.send(error);
  }
});

app.post("/send/:email", async (req, res) => {
  const sendername = req.body.sendername;
  const message = req.body.message;

  const data = {
    status: 200,
    message: "Email sent successfully",
  };

  try {
    if (sendername && message) {
      const info = await sendMail(req?.params?.email, sendername, message);
      res.send(data);
    }
  } catch (error) {
    res.send(error);
  }
});

app.get("/send", (req, res) => {
  res.send("you are in the send route");
});

app.listen(3001, () => {
  console.log("server listening on port 3001");
});
