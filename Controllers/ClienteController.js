const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("SistemaVendaGstv.db", (err) => {
    if (err) {
        console.error(err);
    } else {
        createTable();
        console.log("Conexão estabelecida com sucesso.");
    }
});

function createTable() {
    db.run(
        `CREATE TABLE IF NOT EXISTS Client(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT,
            cpf TEXT,
            telefone TEXT
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

const getClientCount = (callback) => {
    db.get("SELECT COUNT(*) as count FROM Client", (err, row) => {
        if (err) {
            console.error(err);
            callback(0); // Retorna 0 em caso de erro
        } else {
            callback(row.count || 0);
        }
    });
};

const search = (callback) => {
    db.all("SELECT * FROM Client", (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            callback(rows);
        }
    });
};

const insertData = db.prepare(
    `INSERT INTO Client (nome, email, cpf, telefone)
    VALUES (?, ?, ?, ?)`,
    (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Dados inseridos com sucesso.");
        }
    }
);

const deleteData = db.prepare(
    `DELETE FROM Client WHERE id = ?`,
    (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Dados excluídos com sucesso.");
        }
    }
);

const modifyData = db.prepare(
    `UPDATE Client
      SET nome = ?,
          email = ?,
          cpf = ?,
          telefone = ?
     WHERE id = ?`,
    (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Dados modificados com sucesso.");
        }
    }
);

module.exports = {
    search,
    getClientCount,
    insertData,
    deleteData,
    modifyData
};
