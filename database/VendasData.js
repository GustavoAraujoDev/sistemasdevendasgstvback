const sqlite3 = require("sqlite3").verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'SistemaVendaGstv.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err);
    } else {
        createTables();
        console.log("Conexão estabelecida com sucesso.");
    }
});

function createTables() {
    db.run(
        `CREATE TABLE IF NOT EXISTS Vendas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            total_price REAL,
            pagamento TEXT,
            situacao TEXT,
            cliente_id INTEGER,
            FOREIGN KEY (cliente_id) REFERENCES Client(id)
        )`,
        (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Tabela Vendas criada com sucesso.");
            }
        }
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS ItensVenda (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            venda_id INTEGER,
            product_id INTEGER,
            nome TEXT,
            descricao TEXT,
            preco REAL,
            precovenda REAL,
            quantidade INTEGER,
            FOREIGN KEY (venda_id) REFERENCES Vendas(id)
        )`,
        (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Tabela ItensVenda criada com sucesso.");
            }
        }
    );
}

const getTotalVendas = (callback) => {
    db.get("SELECT SUM(Vendas.total_price) AS total FROM Vendas", (err, row) => {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            const total = row.total || 0;
            callback(null, total);
            console.log(total);
        }
    });
};

const inserirVenda = (items, totalPrice, pagamento, situacao, id, callback) => {
    const dataVenda = new Date().toISOString();
    db.run('INSERT INTO Vendas (data_venda, total_price, pagamento, situacao, cliente_id) VALUES (?, ?, ?, ?, ?)', [dataVenda, totalPrice, pagamento, situacao, id], function(err) {
      if (err) {
        console.error('Erro ao inserir venda:', err);
        callback(err, null);
      } else {
        console.log('Venda inserida com sucesso! ID:', this.lastID);
        const vendaId = this.lastID;
        
        // Array para armazenar todas as promises de inserção de itens
        const insercoesItens = [];
  
        items.forEach(item => {
          // Criar uma Promise para cada inserção de item
          const promiseInsercaoItem = new Promise((resolve, reject) => {
            db.run('INSERT INTO ItensVenda (venda_id, product_id, nome, descricao, preco, precovenda, quantidade) VALUES (?, ?, ?, ?, ?, ?, ?)', 
              [vendaId, item.product_id, item.nome, item.descricao, item.preco, item.precovenda, item.quantidade], function(err) {
                if (err) {
                  console.error('Erro ao inserir item de venda:', err);
                  reject(err);
                } else {
                  console.log('Item de venda inserido com sucesso! ID:', this.lastID);
                  resolve();
                }
              }
            );
          });
          insercoesItens.push(promiseInsercaoItem);
        });
  
        // Aguardar todas as promises de inserção de itens serem resolvidas
        Promise.all(insercoesItens)
          .then(() => {
            callback(null, vendaId);
          })
          .catch((err) => {
            callback(err, null);
          });
      }
    });
  };
  
const listarVendas = (callback) => {
    db.all("SELECT * FROM Vendas", (err, rows) => {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};


const listarItensVenda = (id, callback) => {
    db.all("SELECT * FROM ItensVenda WHERE venda_id = ?", [id], (err, rows) => {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            callback(null, rows); // Retornar os itens da venda corretamente
        }
    });
};

const modificarVenda = (situacao, vendaId, callback) => {
    db.run("UPDATE Vendas SET situacao = ? WHERE id = ?", [situacao, vendaId], function(err) {
        if (err) {
            console.error(err);
            callback(err);
        } else {
            console.log(`Venda ${vendaId} modificada com sucesso.`);
            callback(null);
        }
    });
};

const excluirVenda = (id, callback) => {
    db.run("DELETE FROM Vendas WHERE id = ?", [id], function(err) {
        if (err) {
            console.error(err);
            callback(err);
        } else {
            console.log(`Venda ${id} excluída com sucesso.`);
            // Excluir também os itens de venda associados
            db.run("DELETE FROM ItensVenda WHERE venda_id = ?", [id], function(err) {
                if (err) {
                    console.error(err);
                    callback(err);
                } else {
                    console.log(`Itens da venda ${id} excluídos com sucesso.`);
                }
            });
        }
    });
};

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
    getTotalVendas,
    inserirVenda,
    listarVendas,
    listarItensVenda,
    modificarVenda,
    excluirVenda
};
