const controller = require("../database/ClienteData")

function requestClientes(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    

    if (req.method === "GET") {
        controller.Listar(res, req)
    }

    if (req.method === "POST") {
        controller.Create(req, res)
    } else if (req.method === "DELETE") {
        controller.Delete(req, res)
    } else if (req.method === "PUT") {
        controller.Update(req, res)
    }else{
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Método não permitido" }));
    }
}

module.exports = {
    requestClientes
}