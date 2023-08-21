import http from "http";
import { app } from "./app";
import nodemailer from "nodemailer";
import { SMTPServer } from "smtp-server";

http.createServer(app).listen(3000);

const server = new SMTPServer({
  onAuth(auth, session, callback) {
    const { username, password } = auth;
    if (!username || !password) {
      return callback(new Error("Usuário ou senha não encontrado"));
    }
    if (username !== process.env.USERNAME)
      return callback(new Error("Usuário inválido!"));
    if (password !== process.env.PASSWORD)
      return callback(new Error("Senha inválida!"));
    callback(null);
  },
});

server.listen(parseInt(process.env.PORT ?? ""), process.env.HOSTNAME, () => {
  console.log("Servidor SMTP local iniciado");
});

const transporter = nodemailer.createTransport({
  host: process.env.HOSTNAME,
  from: process.env.EMAIL_ALIAS,
  port: parseInt(process.env.PORT ?? ""),
  secure: false,
  ignoreTLS: true,
});

console.log("Up & Running.");

export { transporter };
