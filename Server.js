const http = require("http");
const routesproduct = require("./Routes/ProductRoutes")
const routesvendas = require("./Routes/VendasRoutes")
const routescliente = require("./Routes/ClienteRoutes")
const PORT = process.env.PORT || 6060;

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://carmelis.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.url.startsWith("/Produtos")) {
        routesproduct.requestProdutos(req, res);
    } else if  (req.url.startsWith("/Vendas")) {
        routesvendas.requestVenda(req, res);
    } else if  (req.url.startsWith("/Clientes")) {
        routescliente.requestClientes(req, res);
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Rota não encontrada" }));
    }
});
server.listen(PORT, () => {
    console.log(`Servidor escutando no porto ${PORT}`);
});
