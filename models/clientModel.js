const db = require('../config/dbconfig');
const logger = require('../config/logger');

const getClientCount = () => {
    return new Promise((resolve, reject) => {
        db.db.get("SELECT COUNT(*) as count FROM Client", (err, row) => {
            if (err) {
                logger.error(`Erro ao obter contagem de clientes: ${err}`);
                reject(err);
            } else {
                resolve(row.count || 0);
            }
        });
    });
};

const search = () => {
    return new Promise((resolve, reject) => {
        db.db.all("SELECT * FROM Client", (err, rows) => {
            if (err) {
                logger.error(`Erro ao buscar clientes: ${err}`);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const insertData = (nome, email, cpf, telefone) => {
    return new Promise((resolve, reject) => {
        const stmt = db.db.prepare(
            `INSERT INTO Client (nome, email, cpf, telefone) VALUES (?, ?, ?, ?)`
        );

        stmt.run(nome, email, cpf, telefone, (err) => {
            if (err) {
                logger.error(`Erro ao inserir dados: ${err}`);
                reject(err);
            } else {
                logger.info('Dados inseridos com sucesso.');
                resolve();
            }
        });

        stmt.finalize();
    });
};

const deleteData = (id) => {
    return new Promise((resolve, reject) => {
        const stmt = db.db.prepare(
            `DELETE FROM Client WHERE id = ?`
        );

        stmt.run(id, (err) => {
            if (err) {
                logger.error(`Erro ao excluir dados: ${err}`);
                reject(err);
            } else {
                logger.info('Dados excluídos com sucesso.');
                resolve();
            }
        });

        stmt.finalize();
    });
};

const modifyData = (id, nome, email, cpf, telefone) => {
    return new Promise((resolve, reject) => {
        const stmt = db.db.prepare(
            `UPDATE Client SET nome = ?, email = ?, cpf = ?, telefone = ? WHERE id = ?`
        );

        stmt.run(nome, email, cpf, telefone, id, (err) => {
            if (err) {
                logger.error(`Erro ao modificar dados: ${err}`);
                reject(err);
            } else {
                logger.info('Dados modificados com sucesso.');
                resolve();
            }
        });

        stmt.finalize();
    });
};

module.exports = {
    getClientCount,
    search,
    insertData,
    deleteData,
    modifyData
};
