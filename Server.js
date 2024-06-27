const express = require("express");
const cors = require("cors");
const routesProduct = require("./Routes/ProductRoutes");
const routesVendas = require("./Routes/VendasRoutes");
const routesCliente = require("./Routes/ClienteRoutes");

const port = process.env.PORT || 6060;

const app = express();

// Middleware for CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/Produtos", routesProduct);
app.use("/api/Vendas", routesVendas);
app.use("/api/Clientes", routesCliente);
app.use(errorHandler);

app.listen(port, async () => {
    const db = require('./config/dbconfig');
    await db.createTable(); // Cria a tabela ao iniciar o servidor
    console.log(`Servidor rodando na porta ${port}`);
});

app.use((req, res) => {
    res.status(404).json({ message: "Rota não encontrada" });
});

app.listen(PORT, () => {
    console.log(`Servidor escutando no porto ${PORT}`);
});
