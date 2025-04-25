import express from "express";
import request from "supertest";
import { pool } from "../config/database.js";
import MusicaController from "../controllers/MusicaController.js";


// Mock do pool de conexões do banco de dados
jest.mock("../config/database.js")

const app = express();
app.use(express.json());

// Definindo as rotas para o teste
app.get("/musicas", MusicaController.getAllMusics);
app.get("/musicas/:id", MusicaController.getMusicById);

// Teste para o método getAllmusics
describe("MusicaController", () => {
    describe("getAllMusicas", () => {
        it("deve retornar todos as musicas", async () => {
            // Dados mockados de musica=
            const mockMusic = [
                { id: 1, nome: "Musica 1", cantor: "Queen", nota: 8.5 },
                { id: 2, nome: "Musica 2", cantor: "The Weeknd", nota: 9.1 },
            ];
            // Simulando a resposta do banco de dados
            pool.query.mockResolvedValue({ rows: mockMusic });

            // Fazendo uma requisição GET para a rota de musicas
            const res = await request(app).get("/musicas/");

            // Verificando o status e a resposta da requisição
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockMusic);
        });

        it("deve retornar um erro 500 quando ocorre um erro no servidor", async () => {
            // Simulando um erro no banco de dados
            pool.query.mockRejectedValue(new Error("Database Error"));

            // Fazendo uma requisição GET para a rota de musicas
            const res = await request(app).get("/musicas/");

            // Verificando o status e a resposta da requisição
            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({ message: "Internal Server Error" });
        });
    });
    describe("getMusicById", () => {
        it("should return the musicas with the specified ID", async () => {
            const mockMusic = { id: 1, nome: "Mock music", cantor: "charles", nota: 8.0 };
            pool.query.mockResolvedValue({ rows: [mockMusic] });

            const res = await request(app).get("/musicas/1");

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockMusic);
        });

        it("should return a 404 error when the music with the specified ID is not found", async () => {
            pool.query.mockResolvedValue({ rows: [] });

            const res = await request(app).get("/musicas/999");

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({ message: "Music not found" });
        });

        it("should return a 500 error when there is a server error", async () => {
            pool.query.mockRejectedValue(new Error("Database Error"));

            const res = await request(app).get("/musicas/1");

            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({ message: "Internal Server Error" });
        });
    });
});