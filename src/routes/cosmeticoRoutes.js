const express = require("express");
const router = express.Router();
const controller = require("../controllers/cosmeticoController");
const apiKey = require("../middleware/apiKey");
router.use(apiKey); // Middleware para verificar a chave da API

router.get("/", controller.getAllCosmeticos);
router.get("/:id", controller.getCosmetico);
router.post("/", controller.createCosmetico);
router.put("/:id", controller.updateCosmetico); 
router.delete("/:id", controller.deleteCosmetico); 
router.get("/relatorio/pdf", controller.generatePdfReport);


module.exports = router;