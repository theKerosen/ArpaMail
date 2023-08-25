import express from "express";
import * as dotenv from "dotenv";
import { transporter } from "../server";
dotenv.config();

export const router = express.Router();

router.get("/", async (req, res) => {
  return res.status(401).json({
    message: "ArpaMail is not open to the public.",
  });
});

router.post("/send/", async (req, res) => {
  const body = req.body;
  console.log(req.body);
  const token = req.query.token;
  if (token !== process.env.token)
    return res.status(401).json({
      message: "Arpa Mail não é um serviço público.",
    });

  if (!body)
    return res.status(400).json({
      error: "invalid body.",
      example: {
        senderEmail: "email@example.com",
        text: "Hello.",
      },
    });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_ALIAS,
      to: body.senderEmail,
      subject: "Olá! — lunxi.dev",
      text: `Seu contrato está em análise! Você receberá outro E-mail quando seu contrato for aprovado.`,
    });
  } catch (e) {
    return res.status(400).json({
      error: "The email could not be sent. Probably the email is not valid.",
      errorMessage: e,
    });
  }
  return res.status(200).json({
    success: true,
  });
});
