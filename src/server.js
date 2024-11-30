// importando bibliotecas
import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";


import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { connectDatabase } from "./config/database.js";
import { config } from "dotenv";
config();

import testRouter from "./routes/TestRoute.js";
import productrouter from "./routes/ProductRouter.js";
import musicaRouter from "./routes/MusicaRouter.js";
import userRouter from "./routes/UserRouter.js";

// procurando arquivos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// criando um servidor express
const app = express();
app.use(cookieParser());
const port = process.env.PORT || 4444;

//permitindo backend usar json
app.use(express.json());


app.use(cors({
    origin: 'http://localhost:3000', // Domínio do front-end
    credentials: true, // Permitir envio de cookies
}));

//colocando rota em uso
app.use("/exemplo", testRouter);
app.use("/products", productrouter);
app.use("/auth", userRouter);
app.use("/musicas", musicaRouter);

//servindo uma pagina no html
app.use(express.static(path.join(__dirname, "public")));

// ligando o servidor
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
})

connectDatabase();