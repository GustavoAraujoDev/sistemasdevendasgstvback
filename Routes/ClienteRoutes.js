const controller = require("../database/ClienteData")

function requestClientes(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "GET") {
        controller.search((result) => {
            res.write(JSON.stringify(result));
            res.end();
        });
    }
    if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const parsedBody = JSON.parse(body);
            console.log(parsedBody);
            controller.insertData.run(
                parsedBody.nome,
                parsedBody.email,
                parsedBody.cpf,
                parsedBody.telefone
            );
            console.log("Dados criados com sucesso.");
            res.end(); // Envie a resposta após a inserção de dados
        });
    } else if (req.method === "DELETE") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const parsedBody = JSON.parse(body);
            console.log(parsedBody);
            controller.deleteData.run(parsedBody.id);
            console.log("Dados excluídos com sucesso.");
            res.end(); // Envie a resposta após a exclusão de dados
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
            parsedBody.email,
            parsedBody.cpf,
            parsedBody.telefone,
            parsedBody.id
        );
        console.log("Dados modificados com sucesso.");
        res.end(); // Envie a resposta após a modificação de dados
    });
    }
}

module.exports = {
    requestClientes
}
