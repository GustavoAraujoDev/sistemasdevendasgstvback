const sqlite3 = require("sqlite3").verbose();
const dbPath = './SistemaVendaGstv.db';
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err);
    } else {
        createtable();
        console.log("Conexão estabelecida com sucesso.");
    }
});

function createtable() {
    db.run(
        `CREATE TABLE IF NOT EXISTS Product(
            ProductID INTEGER PRIMARY KEY AUTOINCREMENT,
            Nome TEXT,
            Descricao TEXT,
            Preco REAL,
            PrecoVenda REAL,
            Quantidade INTEGER
        )`,
        (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Tabela criada com sucesso.");
            }
        }
    );
}

const getProductCount = (callback) => {
    db.get("SELECT COUNT(*) as count FROM Product", (err, row) => {
        if (err) {
            console.error(err);
            callback(0); // Retorna 0 em caso de erro
        } else {
            callback(row.count || 0);
        }
    });
};

const search = (callback) => {
    db.all("SELECT * FROM Product", (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            callback(rows);
        }
    });
};

const insertData = db.prepare(
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

const deleteData = db.prepare(
    `DELETE FROM Product WHERE ProductID = ?`,
    (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Dados excluídos com sucesso.");
        }
    }
);

const modifyData = db.prepare(
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

process.on('exit', () => {
    db.close((err) => {
        if (err) {
            console.error('Erro ao fechar o banco de dados:', err.message);
        } else {
            console.log('Banco de dados fechado com sucesso.');
        }
    });
});

module.exports = {
    search,
    getProductCount,
    insertData,
    deleteData,
    modifyData
}