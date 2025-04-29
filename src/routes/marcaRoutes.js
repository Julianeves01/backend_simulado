const express = require("express");
const router = express.Router();
const marcaController = require("../controllers/marcaController");
const apiKey = require("../middleware/apiKey");

router.use(apiKey); // Middleware para verificar a chave da API

// Rotas de marcas
router.get("/", marcaController.getAllMarcas); // Buscar todas as marcas
router.get("/:id", marcaController.getMarca); // Buscar uma marca por ID
router.post("/", marcaController.createMarca); // Criar uma nova marca
router.put("/:id", marcaController.updateMarca); // Atualizar uma marca
router.delete("/:id", marcaController.deleteMarca); // Excluir uma marca

module.exports = router;