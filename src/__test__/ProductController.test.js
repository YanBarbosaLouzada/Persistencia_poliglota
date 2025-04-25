// Importa o mongoose para interação com o MongoDB
import mongoose from "mongoose";
// Importa o controlador de produtos a ser testado
import ProductController from "../controllers/ProductController";
// Importa o modelo de produto
import { Product } from "../models/product";

// Mocking the Product model

// Faz o mock do modelo de produto
jest.mock("../models/product");

describe("ProductController", () => {
    beforeEach(() => {
        // Limpa todos os mocks antes de cada teste
        jest.clearAllMocks();
    });

    describe("getAllProducts", () => {
        it("should get all products", async () => {
            // Testa se o método getAllProducts retorna todos os produtos corretamente

            const mockProducts = [
                {
                    _id: "1",
                    name: "Product 1",
                    description: "Description 1",
                    quantity: 10,
                },
                {
                    _id: "2",
                    name: "Product 2",
                    description: "Description 2",
                    quantity: 5,
                },
            ];

            // Simula o retorno do método find do mongoose
            Product.find.mockResolvedValue(mockProducts);

            // Cria um objeto de requisição vazio
            const req = {};
            const res = {
                // Mock da função json da resposta HTTP
                json: jest.fn(),
            };

            // Chama o método a ser testado
            await ProductController.getAllProducts(req, res);

            // Verifica se a resposta HTTP retornou os produtos esperados
            expect(res.json).toHaveBeenCalledWith({ products: mockProducts });
        });
    });

    describe("createdProduct", () => {
        it("should create a new product", async () => {
            // Testa se o método createdProduct cria um novo produto corretamente

            const mockProductData = {
                name: "New Product",
                description: "Description of new product",
                quantity: 20,
            };

            const mockCreatedProduct = {
                _id: "3",
                ...mockProductData,
            };

            // Simula o retorno do método create do mongoose
            Product.create.mockResolvedValue(mockCreatedProduct);

            // Cria um objeto de requisição com os dados simulados
            const req = { body: mockProductData };
            const res = {
                // Mock da função json da resposta HTTP
                json: jest.fn(),
            };

            // Chama o método a ser testado
            await ProductController.createdProduct(req, res);

            expect(res.json).toHaveBeenCalledWith({
                message: "Criado com sucesso!",
                data: mockCreatedProduct,
                // Verifica se a resposta HTTP retornou a confirmação de criação e os dados do produto criado
            });
        });
    });

    describe("editProduct", () => {
        it("should edit an existing product", async () => {
            // Testa se o método editProduct edita um produto existente corretamente

            const mockProductData = {
                _id: "1",
                name: "Updated Product",
                description: "Updated description",
                quantity: 15,
            };

            const mockUpdatedProduct = {
                _id: "1",
                name: "Updated Product",
                description: "Updated descriptionn",
                quantity: 15,
            };

            // Simula o retorno do método findById do mongoose
            Product.findById.mockResolvedValue(mockUpdatedProduct);
            // Simula o retorno do método findByIdAndUpdate do mongoose
            Product.findByIdAndUpdate.mockResolvedValue(mockUpdatedProduct);

            // Cria um objeto de requisição com os dados simulados
            const req = { body: mockProductData };
            const res = {
                // Mock da função json da resposta HTTP
                json: jest.fn(),
            };

            // Chama o método a ser testado
            await ProductController.editProduct(req, res);

            expect(res.json).toHaveBeenCalledWith({
                message: "Editado com sucesso!",
                updatedProduct: mockUpdatedProduct,
                // Verifica se a resposta HTTP retornou a confirmação de edição e os dados do produto editado
            });
        });

        it("should handle editing a non-existing product", async () => {
            // Testa se o método editProduct trata corretamente a tentativa de editar um produto que não existe

            const mockProductData = {
                _id: "999",
                name: "Updated Product",
                description: "Updated description",
                quantity: 15,
            };

            // Simula que nenhum produto foi encontrado com o id fornecido
            Product.findById.mockResolvedValue(null);

            // Cria um objeto de requisição com os dados simulados
            const req = { body: mockProductData };
            const res = {
                // Mock da função json da resposta HTTP
                json: jest.fn(),
            };

            // Chama o método a ser testado
            await ProductController.editProduct(req, res);

            expect(res.json).toHaveBeenCalledWith({
                message: "Não existe um produto com este id!",
                // Verifica se a resposta HTTP retornou a mensagem de erro correta
            });
        });
    });

    describe("deleteProduct", () => {
        it("should delete an existing product", async () => {
            // Testa se o método deleteProduct deleta um produto existente corretamente

            const mockProductId = "1";

            // Simula o retorno do método findOneAndDelete do mongoose
            Product.findOneAndDelete.mockResolvedValue();

            // Cria um objeto de requisição com os dados simulados
            const req = { params: { id: mockProductId } };
            const res = {
                // Mock da função json da resposta HTTP
                json: jest.fn(),
            };

            // Chama o método a ser testado
            await ProductController.deleteProduct(req, res);

            // Verifica se a resposta HTTP retornou a confirmação de exclusão
            expect(res.json).toHaveBeenCalledWith({ message: "Deletado com sucesso!" });
        });
    });
});