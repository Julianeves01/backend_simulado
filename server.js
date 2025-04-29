require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cosmeticoRoutes = require("./src/routes/cosmeticoRoutes");
const marcaRoutes = require("./src/routes/marcaRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/cosmeticos", cosmeticoRoutes);
app.use("/api/marcas", marcaRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🎀 Servidor rodando em http://localhost:${PORT}`);
});
