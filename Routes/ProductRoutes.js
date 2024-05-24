const controller = require("../database/ProductData")

function requestProdutos(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "GET") {
        controller.search((result) => {
            res.write(JSON.stringify(result));
            res.end();
        });
    } else if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const parsedBody = JSON.parse(body);
            console.log(parsedBody);
            controller.insertData.run(
                parsedBody.Nome,
                parsedBody.Descricao,
                parsedBody.Preco,
                parsedBody.PrecoVenda,
                parsedBody.Quantidade
            );
            console.log("Dados criados com sucesso.");
        });
    } else if (req.method === "DELETE") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const parsedBody = JSON.parse(body);
            console.log(parsedBody);
            controller.deleteData.run(parsedBody.ProductID);
            console.log("Dados excluídos com sucesso.");
        });
    } else if (req.method === "PUT") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const parsedBody = JSON.parse(body);
            console.log(parsedBody);
            controller.modifyData.run(
                parsedBody.Nome,
                parsedBody.Descricao,
                parsedBody.Preco,
                parsedBody.PrecoVenda,
                parsedBody.Quantidade,
                parsedBody.ProductID
            );
            console.log("Dados modificados com sucesso.");
        });
    }
}

module.exports = {
    requestProdutos
}