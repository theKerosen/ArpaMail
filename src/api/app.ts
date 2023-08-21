import express from "express";
import { router } from "./routes/routes";
import bodyParser from "body-parser";

export const app = express();

app.use(bodyParser.json());
app.use("/", router);
app.set("json spaces", 2);
