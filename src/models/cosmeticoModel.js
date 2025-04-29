const pool = require("../config/database");

const getCosmeticos = async () => {
    const result = await pool.query(
        `SELECT cosmeticos.*, marcas.nome AS marca_nome 
        FROM cosmeticos 
        LEFT JOIN marcas ON cosmeticos.marca_id = marca.id`
    );
    return result.rows;
};

const getCosmeticoById = async (id) => {
    const result = await pool.query(
    `SELECT cosmeticos.*, marcas.nome AS marca_nome
    FROM cosmeticos
    LEFT JOIN marcas ON cosmeticos.marca_id = marcas.id
    WHERE cosmeticos.id = $1`,
    [id]
    );
    return result.rows[0];
};

const createCosmetico = async (nome, descricao, preco, foto, marca_id) => {
    const result = await pool.query(
        `INSERT INTO cosmeticos(nome, descricao, preco, foto, marca_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [nome, descricao, preco, foto, marca_id]
    );
    return result.rows[0];
};

module.exports = {getCosmeticos, getCosmeticoById, createCosmetico};