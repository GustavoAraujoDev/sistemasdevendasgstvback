const express = require("express");
const cors = require("cors");
const routesProduct = require("./Routes/ProductRoutes");
const routesVendas = require("./Routes/VendasRoutes");
const routesCliente = require("./Routes/ClienteRoutes");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 6060;
const sequelize = require('./config/dbconfig');
const Logger = require('./config/logger');
const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/Produtos", routesProduct);
app.use("/Vendas", routesVendas);
app.use("/Clientes", routesCliente);
app.use(errorHandler);

app.use((req, res) => {
    res.status(404).json({ message: "Rota não encontrada" });
});


const startServer = async () => {
    try {
        await sequelize.sync();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            Logger.info(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        Logger.error('Unable to connect to the database:', error);
    }
};
startServer();
