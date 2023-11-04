const express = require("express");
const app = express();

const { sendMail } = require("./app");

app.get("/", (req, res) => {
  res.send("use /send/:email to send email...");
});

app.get("/send/:email", async (req, res) => {
  const data = {
    status: 200,
    message: "Email sent successfully",
  };
  try {
    if (req.params.email) {
      const info = await sendMail(req.params.email);
      // res.send(info);
      res.json(data);
    }
  } catch (error) {
    res.send(error);
  }
});

app.get("/send", (req, res) => {
  res.send("you are in the send route");
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
