const express = require("express");
const router = express.Router();
const { generatePdfReportForCosmeticos } = require("../controllers/cosmeticoController");
const apiKeyMiddleware = require("../middleware/apiKey"); 

// Rota para gerar o relatório de cosméticos em PDF com validação de API Key
router.get("/relatorio/cosmeticos", apiKeyMiddleware, generatePdfReportForCosmeticos);

module.exports = router;