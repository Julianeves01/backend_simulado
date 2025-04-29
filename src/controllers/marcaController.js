const marcaModel = require("../models/marcaModel");

const createMarca = async (req, res) => {
        try {
                console.log("Dados recebidos:", req.body); // Log para depuração
                const { nome, pais_origem } = req.body;

                // Validação básica
                if (!nome || !pais_origem) {
                        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
                }

                // Criação da marca
                const novaMarca = await marcaModel.createMarca({ nome, pais_origem });

                // Retorna mensagem de sucesso e a marca criada
                res.status(201).json({
                        message: "Marca criada com sucesso!",
                        marca: novaMarca
                });
        } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Erro ao criar marca." });
        }
};

const getAllMarcas = async (req, res) => {
        try {
                const marcas = await marcaModel.getMarcas();
                res.status(200).json(marcas);
        } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Erro ao buscar marcas." });
        }
};

const getMarca = async (req, res) => {
        try {
                const { id } = req.params;
                const marca = await marcaModel.getMarcaById(id);

                if (!marca) {
                        return res.status(404).json({ message: "Marca não encontrada." });
                }

                res.status(200).json(marca);
        } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Erro ao buscar marca." });
        }
};

const updateMarca = async (req, res) => {
        try {
                const { id } = req.params;
                const { nome, pais_origem } = req.body;

                // Validação básica
                if (!nome || !pais_origem) {
                        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
                }

                // Atualização da marca
                const marcaAtualizada = await marcaModel.updateMarca(id, { nome, pais_origem });

                if (!marcaAtualizada) {
                        return res.status(404).json({ message: "Marca não encontrada." });
                }

                res.status(200).json({
                        message: "Marca atualizada com sucesso!",
                        marca: marcaAtualizada
                });
        } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Erro ao atualizar marca." });
        }
};

const deleteMarca = async (req, res) => {
        try {
                const { id } = req.params;

                // Exclusão da marca
                const marcaExcluida = await marcaModel.deleteMarca(id);

                if (!marcaExcluida) {
                        return res.status(404).json({ message: "Marca não encontrada." });
                }

                res.status(200).json({
                        message: "Marca excluída com sucesso!",
                        marca: marcaExcluida
                });
        } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Erro ao excluir marca." });
        }
};

module.exports = { createMarca, getAllMarcas, getMarca, updateMarca, deleteMarca };