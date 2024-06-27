const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const logger = require("./logger");

// Caminho para o banco de dados SQLite
const dbPath = path.resolve(__dirname, '../../SistemaVendaGstv.db');

// Inicialização do banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        logger.error(`Erro ao conectar ao banco de dados: ${err.message}`);
    } else {
        console.log('Conexão estabelecida com sucesso.');
        createTables(); // Criação das tabelas ao conectar
    }
});

// Função para criar todas as tabelas necessárias
const createTables = async () => {
    try {
        await createClientTable();
        await createProductTable();
        await createVendasTables();
        console.log('Todas as tabelas foram criadas com sucesso.');
    } catch (err) {
        logger.error(`Erro ao criar tabelas: ${err.message}`);
    }
};

// Criação da tabela Client
const createClientTable = () => {
    return new Promise((resolve, reject) => {
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
                    logger.error(`Erro ao criar tabela Client: ${err.message}`);
                    reject(err);
                } else {
                    logger.info('Tabela Client criada com sucesso.');
                    resolve();
                }
            }
        );
    });
};

// Criação da tabela Product
const createProductTable = () => {
    return new Promise((resolve, reject) => {
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
                    logger.error(`Erro ao criar tabela Product: ${err.message}`);
                    reject(err);
                } else {
                    logger.info('Tabela Product criada com sucesso.');
                    resolve();
                }
            }
        );
    });
};

// Criação das tabelas Vendas e ItensVenda
const createVendasTables = () => {
    return new Promise((resolve, reject) => {
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
                    logger.error(`Erro ao criar tabela Vendas: ${err.message}`);
                    reject(err);
                } else {
                    logger.info('Tabela Vendas criada com sucesso.');
                    createItensVendaTable()
                        .then(() => resolve())
                        .catch((err) => reject(err));
                }
            }
        );
    });
};

// Criação da tabela ItensVenda
const createItensVendaTable = () => {
    return new Promise((resolve, reject) => {
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
                    logger.error(`Erro ao criar tabela ItensVenda: ${err.message}`);
                    reject(err);
                } else {
                    logger.info('Tabela ItensVenda criada com sucesso.');
                    resolve();
                }
            }
        );
    });
};

// Função para fechar o banco de dados
const closeDatabase = () => {
    db.close((err) => {
        if (err) {
            logger.error(`Erro ao fechar o banco de dados: ${err.message}`);
        } else {
            console.log('Banco de dados fechado com sucesso.');
        }
    });
};

// Evento para fechar o banco de dados quando a aplicação terminar
process.on('exit', closeDatabase);

module.exports = {
    db,
    createTables
};
