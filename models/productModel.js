const db = require('../config/dbconfig');

const getProductCount = (callback) => {
    db.db.get("SELECT COUNT(*) as count FROM Product", (err, row) => {
        if (err) {
            console.error(err);
            callback(0);
        } else {
            callback(row.count || 0);
        }
    });
};

const getAllProducts = (callback) => {
    db.db.all("SELECT * FROM Product", (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            callback(rows);
        }
    });
};

const insertProduct = (product, callback) => {
    const { Nome, Descricao, Preco, PrecoVenda, Quantidade } = product;
    const stmt = db.db.prepare(
        `INSERT INTO Product (Nome, Descricao, Preco, PrecoVenda, Quantidade)
        VALUES (?, ?, ?, ?, ?)`,
        (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Dados inseridos com sucesso.");
            }
        }
    );
    stmt.run(Nome, Descricao, Preco, PrecoVenda, Quantidade, callback);
    stmt.finalize();
};

const deleteProduct = (id, callback) => {
    const stmt = db.db.prepare(
        `DELETE FROM Product WHERE ProductID = ?`,
        (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Dados excluídos com sucesso.");
            }
        }
    );
    stmt.run(id, callback);
    stmt.finalize();
};

const updateProduct = (product, callback) => {
    const { ProductID, Nome, Descricao, Preco, PrecoVenda, Quantidade } = product;
    const stmt = db.db.prepare(
        `UPDATE Product
          SET Nome = ?,
              Descricao = ?,
              Preco = ?,
              PrecoVenda = ?,
              Quantidade = ?
         WHERE ProductID = ?`,
        (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Dados modificados com sucesso.");
            }
        }
    );
    stmt.run(Nome, Descricao, Preco, PrecoVenda, Quantidade, ProductID, callback);
    stmt.finalize();
};

module.exports = {
    getProductCount,
    getAllProducts,
    insertProduct,
    deleteProduct,
    updateProduct
};
