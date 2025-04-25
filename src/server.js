// importando bibliotecas
import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";


import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { connectDatabase } from "./config/database.js";
import { config } from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
config();

import testRouter from "./routes/TestRoute.js";
import productrouter from "./routes/ProductRouter.js";
import musicaRouter from "./routes/MusicaRouter.js";
import userRouter from "./routes/UserRouter.js";
import pokemonRouter from "./routes/PokemonRouter.js";

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

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("Usuário conectado!", socket.id);
    socket.on("disconnect", (reason) => {
        console.log("Usuário desconectado!", socket.id);
    });
    socket.on("set_username", (username) => {
        socket.data.username = username;
    });
    socket.on("message", (messageData) => {
        io.emit("receive_message", {
            ...messageData,
            authorId: socket.id,
            author: socket.data.username,
        });
    });
});

server.listen(8080, () => {
    console.log("Socket.IO server running on port 8080");
});


//colocando rota em uso
app.use("/exemplo", testRouter);
app.use("/products", productrouter);
app.use("/auth", userRouter);
app.use("/musicas", musicaRouter);
app.use("/pokemons", pokemonRouter);

//servindo uma pagina no html
app.use(express.static(path.join(__dirname, "public")));

// ligando o servidor
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
})

connectDatabase();