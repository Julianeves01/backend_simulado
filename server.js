require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cosmeticoRoutes = require("./src/routes/cosmeticoRoutes");
const marcaRoutes = require("./src/routes/marcaRoutes");

app.use(cors());
app.use(express.json()); // Middleware para processar JSON

// Rotas
app.use("/cosmeticos", cosmeticoRoutes);
app.use("/api/marcas", marcaRoutes); // Certifique-se de que o caminho está correto

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🎀 Servidor rodando em http://localhost:${PORT}`);
});
