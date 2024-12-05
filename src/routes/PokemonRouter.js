// importando bibliotecas 
import { Router } from "express";
import PokemonController from "../controllers/PokemonController.js";

//criando variavel que vai guardar nossa função router
const pokemonRouter = Router();

//criando função que vai ser responsavel por criar as rotas
pokemonRouter.get("/", PokemonController.getPokemon);
pokemonRouter.post("/create", PokemonController.createPokemon);
pokemonRouter.delete("/delete/:id", PokemonController.deletePokemon);

//exportando a função router para ser utilizada em outros arquivos
export default pokemonRouter;

