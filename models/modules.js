const { query } = require('../database');
const { DUPLICATE_ENTRY_ERROR, EMPTY_RESULT_ERROR, SQL_ERROR_CODE, TABLE_ALREADY_EXISTS_ERROR } = require('../errors');

module.exports.initTable = function initTable() {
    const sql = `CREATE TABLE modules_tab (
        id SERIAL primary key,
        code VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        credit NUMERIC(2,1) NOT NULL
    )`;
    return query(sql).catch(function (error) {
        if (error.errno === SQL_ERROR_CODE.TABLE_ALREADY_EXISTS) {
            throw new TABLE_ALREADY_EXISTS_ERROR(`modules_tab`);
        }
        throw error;
    });
};

module.exports.create = function create(code, name, credit) {
    const sql = `INSERT INTO modules_tab (code, name, credit) VALUES ($1, $2, $3)`;
    return query(sql, [code, name, credit]).catch(function (error) {
        if (error.errno === SQL_ERROR_CODE.DUPLICATE_ENTRY) {
            throw new DUPLICATE_ENTRY_ERROR(`Module ${code} already exists`);
        }
        throw error;
    });
};

module.exports.retrieveByCode = function retrieveByCode(code) {
    const sql = `SELECT * FROM modules_tab WHERE code = $1`;
    return query(sql, [code]).then(function (result) {
        const rows = result.rows;

        if (rows.length === 0) {
            // Note: result.rowCount returns the number of rows processed instead of returned
            // Read more: https://node-postgres.com/apis/result#resultrowcount-int--null
            throw new EMPTY_RESULT_ERROR(`Module ${code} not found!`);
        }

        return rows[0];
    });
};

module.exports.deleteByCode = function deleteByCode(code) {
    const sql = `DELETE FROM modules_tab WHERE code = $1;`

    return query(sql, [code]).then(function (result) {
        const rows = result.rows;

        console.log(rows)

        if (rows.length === 0) {
            throw new EMPTY_RESULT_ERROR(`Module not deleted!`);
        }
            return rows[0];
        


    });
};

module.exports.updateByCode = function updateByCode(code, credit) {
    // TODO implement update by code
    // Hint: Use result.rowCount to check the number of rows affected
};

module.exports.retrieveAll = function retrieveAll() {
    // TODO implement retrieve all
    const sql = `SELECT * FROM modules_tab`;
    
    return query(sql).then(function (result) {

        const rows = result.rows;


        if (rows.length === 0) {
            // Note: result.rowCount returns the number of rows processed instead of returned
            // Read more: https://node-postgres.com/apis/result#resultrowcount-int--null
            throw new EMPTY_RESULT_ERROR(`Module ${code} not found!`);
        }
        console.log(rows)
        return rows;
    });
};

module.exports.retrieveBulk = function retrieveBulk(codes) {
    const sql = 'SELECT * FROM modules_tab WHERE code IN ($1)';
    return query(sql, [codes]).then(function (response) {
        const rows = response.rows;
        const result = {};
        for (let i = 0; i < rows.length; i += 1) {
            const row = rows[i];
            const code = row.code;
            result[code] = row;
        }
        return result;
    });
};
