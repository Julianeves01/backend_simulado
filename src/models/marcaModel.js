const pool = require("../config/database");

const getMarcas = async () => {
    const query = `SELECT * FROM marcas`;
    const result = await pool.query(query);
    return result.rows; // Retorna todas as marcas
};

const getMarcaById = async (id) => {
    const query = `SELECT * FROM marcas WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0]; // Retorna a marca correspondente ao ID
};

const createMarca = async ({ nome, pais_origem }) => {
    const query = `
        INSERT INTO marcas (nome, pais_origem)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const values = [nome, pais_origem];
    const result = await pool.query(query, values);
    return result.rows[0]; // Retorna a marca criada
};

const updateMarca = async (id, { nome, pais_origem }) => {
    const query = `
        UPDATE marcas
        SET nome = $1, pais_origem = $2
        WHERE id = $3
        RETURNING *;
    `;
    const values = [nome, pais_origem, id];
    const result = await pool.query(query, values);
    return result.rows[0]; // Retorna a marca atualizada
};

const deleteMarca = async (id) => {
    const query = `
        DELETE FROM marcas
        WHERE id = $1
        RETURNING *;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0]; // Retorna a marca excluída (se existir)
};

module.exports = { createMarca, getMarcas, getMarcaById, updateMarca, deleteMarca };