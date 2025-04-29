const pool = require("../config/database");

const getMarcas = async () => {
    const result = await pool.query("SELECT * FROM marcas");
    return result.rows;
};

const getMarcaById = async (id) => {
    const result = await pool.query("SELECT * FROM marcas WHERE id = $1", [id]);
    return result.rows[0];
}

module.exports = {getMarcas, getMarcaById};