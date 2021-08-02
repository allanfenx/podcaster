import "./database/connection";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import Routes from "./routes/EpisodesRoutes";

const app = express();
const Port = 8080;

app.use(cors());
app.use(express.json());
app.use(Routes);


app.listen(Port, () => {
    console.log("Aplication running");
});