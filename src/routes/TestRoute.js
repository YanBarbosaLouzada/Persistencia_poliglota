import { Router } from "express";
import TestController from "../controllers/TestController.js";

const testRouter = Router();

testRouter.get("/teste", TestController.PrimeiraFuncao);
testRouter.get("/get", TestController.get);
testRouter.post("/post", TestController.post);
testRouter.put("/put", TestController.put);
testRouter.delete("/delete", TestController.delete);

export default testRouter;

// Get pega alguma coisa ou mostra
// Post cria algo
// Put atualiza algo
// Delete deleta algo

