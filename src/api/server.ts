import https from "https";
import { app } from "./app";
import nodemailer from "nodemailer";
import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";

https.createServer(app).listen(3000);

const server = new SMTPServer({
  onData(stream, session, callback) {
    simpleParser(stream, {}, (err, parsed) => {
      if (err) console.log("Error:", err);

      console.log(parsed);
      stream.on("end", callback);
    });
  },
  disabledCommands: ["AUTH"],
});

server.listen(parseInt(process.env.PORT ?? ""), process.env.HOSTNAME, () => {
  console.log("Servidor SMTP iniciado");
});

const transporter = nodemailer.createTransport({
  host: process.env.HOSTNAME,
  from: process.env.EMAIL_ALIAS,
  port: parseInt(process.env.PORT ?? ""),
});

console.log("Up & Running.");

export { transporter };
