import { Router } from "express";
import MusicaController from "../controllers/MusicaController.js";

const musicaRouter = Router();

musicaRouter.get("/", MusicaController.getAllMusics);
// musica router vai pegar no caminho / dentro do musica controller a função getAllmusics

musicaRouter.post("/create", MusicaController.createMusic);
// musica router vai pegar no caminho /create dentro do musica controller a função createMusic

musicaRouter.get("/info/:id", MusicaController.getMusicById);
// musica router vai pegar no caminho /get/:id dentro do musica controller a função get

musicaRouter.put("/edit/:id", MusicaController.updateMusic);
// musica router vai pegar no caminho /update/:id dentro do musica controller a função update

musicaRouter.delete("/delete/:id", MusicaController.deleteMusic);
// musica router vai pegar no caminho /delete/:id dentro do musica controller a função delete


export default musicaRouter;