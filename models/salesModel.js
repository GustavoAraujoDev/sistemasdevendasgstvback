const db = require('../config/dbconfig');

const getTotalVendas = (callback) => {
    db.db.get("SELECT SUM(total_price) AS total FROM Vendas", (err, row) => {
        if (err) {
            callback(err, null);
        } else {
            const total = row.total || 0;
            callback(null, total);
        }
    });
};

const inserirVenda = (items, totalPrice, pagamento, situacao, clienteId, callback) => {
    const dataVenda = new Date().toISOString();
    db.db.run('INSERT INTO Vendas (data_venda, total_price, pagamento, situacao, cliente_id) VALUES (?, ?, ?, ?, ?)', 
        [dataVenda, totalPrice, pagamento, situacao, clienteId], function(err) {
        if (err) {
            callback(err, null);
        } else {
            const vendaId = this.lastID;
            const insercoesItens = items.map(item => new Promise((resolve, reject) => {
                db.run('INSERT INTO ItensVenda (venda_id, product_id, nome, descricao, preco, precovenda, quantidade) VALUES (?, ?, ?, ?, ?, ?, ?)', 
                    [vendaId, item.product_id, item.nome, item.descricao, item.preco, item.precovenda, item.quantidade], function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }));

            Promise.all(insercoesItens)
                .then(() => callback(null, vendaId))
                .catch(err => callback(err, null));
        }
    });
};

const listarVendas = (callback) => {
    db.db.all("SELECT * FROM Vendas", (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

const listarItensVenda = (vendaId, callback) => {
    db.db.all("SELECT * FROM ItensVenda WHERE venda_id = ?", [vendaId], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

const modificarVenda = (situacao, vendaId, callback) => {
    db.db.run("UPDATE Vendas SET situacao = ? WHERE id = ?", [situacao, vendaId], function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
};

const excluirVenda = (vendaId, callback) => {
    db.db.run("DELETE FROM Vendas WHERE id = ?", [vendaId], function(err) {
        if (err) {
            callback(err);
        } else {
            db.run("DELETE FROM ItensVenda WHERE venda_id = ?", [vendaId], function(err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        }
    });
};

module.exports = {
    getTotalVendas,
    inserirVenda,
    listarVendas,
    listarItensVenda,
    modificarVenda,
    excluirVenda
};
