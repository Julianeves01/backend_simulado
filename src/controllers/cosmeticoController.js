const PDFDocument = require("pdfkit"); // Importação do PDFKit
const cosmeticoModel = require('../models/cosmeticoModel');

const getAllCosmeticos = async (req, res) => {
    try {
        const nome = req.query.nome;
        const lista = await cosmeticoModel.getCosmeticos(nome);
        res.json(lista);
    } catch (error) {
        console.error("Erro ao buscar cosméticos:", error);
        res.status(500).json({ message: "Erro ao buscar cosméticos." });
    }
};

const getCosmetico = async (req, res) => {
    try {
        const item = await cosmeticoModel.getCosmeticoById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Cosmético não encontrado." });
        }
        res.json(item);
    } catch (error) {
        console.error("Erro ao buscar cosmético:", error);
        res.status(500).json({ message: "Erro ao buscar cosmético." });
    }
};

const createCosmetico = async (req, res) => {
    try {
        const { nome, preco, marca_id } = req.body;

        // Validação básica
        if (!nome || !preco || !marca_id) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        // Criação do cosmético e captura do resultado
        const novoCosmetico = await cosmeticoModel.createCosmetico({ nome, preco, marca_id });

        // Retorna mensagem de sucesso e o cosmético criado
        res.status(201).json({
            message: "Cosmético criado com sucesso!",
            cosmetico: novoCosmetico
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar cosmético." });
    }
};

const updateCosmetico = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, preco, marca_id } = req.body;

        // Validação básica
        if (!nome || !preco || !marca_id) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        // Atualização do cosmético
        const cosmeticoAtualizado = await cosmeticoModel.updateCosmetico(id, { nome, preco, marca_id });

        if (!cosmeticoAtualizado) {
            return res.status(404).json({ message: "Cosmético não encontrado." });
        }

        res.status(200).json({
            message: "Cosmético atualizado com sucesso!",
            cosmetico: cosmeticoAtualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar cosmético." });
    }
};

const deleteCosmetico = async (req, res) => {
    try {
        const { id } = req.params;

        // Exclusão do cosmético
        const cosmeticoExcluido = await cosmeticoModel.deleteCosmetico(id);

        if (!cosmeticoExcluido) {
            return res.status(404).json({ message: "Cosmético não encontrado." });
        }

        res.status(200).json({
            message: "Cosmético excluído com sucesso!",
            cosmetico: cosmeticoExcluido
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao excluir cosmético." });
    }
};

const generatePdfReport = async (req, res) => {
    try {
        const cosmeticos = await cosmeticoModel.getCosmeticos();

        const doc = new PDFDocument();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=relatorio_cosmeticos.pdf");

        doc.pipe(res);

        doc.fontSize(18).text("Relatório de Cosméticos", { align: "center" });
        doc.moveDown();

        cosmeticos.forEach((item, index) => {
            doc
                .fontSize(12)
                .text(`${index + 1}. Nome: ${item.nome}`)
                .text(`   Preço: R$ ${item.preco.toFixed(2)}`)
                .text(`   Marca: ${item.marca_nome || "Não informada"}`)
                .moveDown();
        });

        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao gerar relatório PDF." });
    }
};

module.exports = { 
    getAllCosmeticos, 
    getCosmetico, 
    createCosmetico, 
    updateCosmetico, 
    deleteCosmetico, 
    generatePdfReport // Adicionando a função ao export
};