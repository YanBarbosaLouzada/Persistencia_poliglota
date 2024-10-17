// importando bibliotecas
import express from "express";
import cors from 'cors'
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import testRouter from "./routes/TestRoute.js";
import productrouter from "./routes/ProductRouter.js";
import { connectDatabase } from "./config/database.js";
import userRouter from "./routes/UserRouter.js";
import { config } from "dotenv";
config();





// procurando arquivos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// criando um servidor express
const app = express();
const port = process.env.PORT || 4444;

//permitindo backend usar json
app.use(express.json());


app.use(cors());

//colocando rota em uso
app.use("/exemplo", testRouter);
app.use("/products", productrouter);
app.use("/auth", userRouter);

//servindo uma pagina no html
app.use(express.static(path.join(__dirname, "public")));

// ligando o servidor
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
})

connectDatabase();