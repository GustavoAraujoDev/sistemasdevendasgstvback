const express = require('express');
const app = express();
const clientRoutes = require('./routes/clientRoutes');
const errorHandler = require('./middlewares/errorHandler');
const { port } = require('./config/appconfig');

app.use(express.json());
app.use('/Clientes', clientRoutes);
app.use(errorHandler);

app.listen(port, async () => {
    const db = require('./config/dbconfig');
    await db.createTable(); // Cria a tabela ao iniciar o servidor
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
