const express = require("express");
const cors = require("cors");
const routesProduct = require("./Routes/ProductRoutes");
const routesVendas = require("./Routes/VendasRoutes");
const routesCliente = require("./Routes/ClienteRoutes");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 6060;

const app = express();

// Middleware for CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/Produtos", routesProduct);
app.use("/Vendas", routesVendas);
app.use("/Clientes", routesCliente);
app.use(errorHandler);

app.use((req, res) => {
    res.status(404).json({ message: "Rota não encontrada" });
});

app.listen(PORT, () => {
    console.log(`Servidor escutando no porto ${PORT}`);
});
