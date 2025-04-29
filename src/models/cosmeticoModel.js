const pool = require("../config/database");

const getCosmeticos = async (filtroNome) => {
    let query = `SELECT cosmeticos.*, marcas.nome AS marca_nome
            FROM cosmeticos
            LEFT JOIN marcas ON cosmeticos.marca_id = marcas.id`;

    let params = [];

    if (filtroNome) {
        query += " WHERE LOWER(cosmeticos.nome) LIKE $1";
        params.push(`%${filtroNome.toLowerCase()}%`);
    }

    const result = await pool.query(query, params);
    return result.rows;
};

const getCosmeticoById = async (id) => {
    const result = await pool.query(
        `SELECT cosmeticos.*, marcas.nome AS marca_nome
    FROM cosmeticos
    LEFT JOIN marcas ON cosmeticos.marca_id = marcas.id
    WHERE cosmeticos.id = $1`, [id]);
    return result.rows[0];
};

const createCosmetico = async ({ nome, preco, marca_id }) => {
    const query = `
        INSERT INTO cosmeticos (nome, preco, marca_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [nome, preco, marca_id];
    const result = await pool.query(query, values);
    return result.rows[0]; // Retorna o cosmético criado
};

const updateCosmetico = async (id, { nome, preco, marca_id }) => {
    const query = `
        UPDATE cosmeticos
        SET nome = $1, preco = $2, marca_id = $3
        WHERE id = $4
        RETURNING *;
    `;
    const values = [nome, preco, marca_id, id];
    const result = await pool.query(query, values);
    return result.rows[0]; // Retorna o cosmético atualizado
};

const deleteCosmetico = async (id) => {
    const query = `
        DELETE FROM cosmeticos
        WHERE id = $1
        RETURNING *;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0]; // Retorna o cosmético excluído (se existir)
};

module.exports = { getCosmeticos, getCosmeticoById, createCosmetico, updateCosmetico, deleteCosmetico };