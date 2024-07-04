const db = require('../config/dbconfig');
const logger = require('../config/logger');

const getProductCount = () => {
    return new Promise((resolve, reject) => {
        db.db.get("SELECT COUNT(*) as count FROM Product", (err, row) => {
            if (err) {
                logger.error(`Erro ao obter contagem de Productes: ${err}`);
                reject(err);
            } else {
                resolve(row.count || 0);
            }
        });
    });
};

const search = () => {
    return new Promise((resolve, reject) => {
        db.db.all("SELECT * FROM Product", (err, rows) => {
            if (err) {
                logger.error(`Erro ao buscar Productes: ${err}`);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const insertData = (Nome, Descricao, Preco, PrecoVenda, Quantidade) => {
    return new Promise((resolve, reject) => {
        const stmt = db.db.prepare(
            `INSERT INTO Product (Nome, Descricao, Preco, PrecoVenda, Quantidade) VALUES (?, ?, ?, ?)`
        );

        stmt.run(Nome, Descricao, Preco, PrecoVenda, Quantidade, (err) => {
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

const deleteData = (ProductID) => {
    return new Promise((resolve, reject) => {
        const stmt = db.db.prepare(
            `DELETE FROM Product WHERE ProductID = ?`
        );

        stmt.run(ProductID, (err) => {
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

const modifyData = (ProductID, Nome, Descricao, Preco, PrecoVenda, Quantidade) => {
    return new Promise((resolve, reject) => {
        const stmt = db.db.prepare(
            `UPDATE Product SET Nome = ?, Descricao = ?, Preco = ?, PrecoVenda = ?, Quantidade = ?  WHERE ProductID = ?`
        );

        stmt.run(Nome, Descricao, Preco, PrecoVenda, Quantidade, ProductID, (err) => {
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
    getProductCount,
    search,
    insertData,
    deleteData,
    modifyData
};
