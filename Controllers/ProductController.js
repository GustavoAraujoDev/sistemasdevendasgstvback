const controller = require('../database/ProductData')

function Listar(req, res) {
    controller.search((result) => {
        res.write(JSON.stringify(result));
        res.end();
    });
}
function Create(req, res) {
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
}

function Update(req, res) {
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
function Delete(req, res) {
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
}

module.exports = {
    Listar, Create, Update, Delete
}