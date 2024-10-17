import { Router } from "express"
import ProductController from "../controllers/ProductController.js"
import UserController from "../controllers/UserController.js";

const productrouter = Router();


productrouter.get("/", ProductController.getAllProducts);
productrouter.post("/create-product",UserController.authenticateToken, ProductController.createdProduct);
productrouter.put("/edit-product", UserController.authenticateToken, ProductController.editProduct);
productrouter.delete("/delete-product/:id", UserController.authenticateToken, ProductController.deleteProduct);


export default productrouter;