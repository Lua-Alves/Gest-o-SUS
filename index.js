const express = require('express');
const fs = require('fs');
const app = express();
const port = 6200;

const novos = require('./dados/novos.json');
const ofertas = require('./dados/ofertas.json');
const seminovos = require('./dados/seminovos.json');

const htmlBase = (titulo, conteudo) => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${titulo}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div class="container">
            <a class="navbar-brand" href="/">Gestão de Saúde SUS</a>
            <div class="navbar-nav">
                <a class="nav-link" href="/quemsou">Quem Sou</a>
                <a class="nav-link" href="/ofertas">Ofertas de Serviços</a>
                <a class="nav-link" href="/novos">Novas Incorporações</a>
                <a class="nav-link" href="/seminovos">Auditoria de Unidades</a>
            </div>
        </div>
    </nav>
    <div class="container pb-5">
        ${conteudo}
    </div>
</body>
</html>
`;

// Apresentação geral do projeto
app.get('/', (req, res) => {
    const conteudo = `
        <div class="jumbotron bg-white p-5 rounded shadow-sm">
            <h1 class="display-4 text-primary">Sistema de Gestão de Saúde</h1>
            <p class="lead">Bem-vindo ao portal de administração e transparência do SUS.</p>
            <hr class="my-4">
            <p>Este sistema tem como principal objetivo centralizar a gestão de recursos, unidades e serviços de saúde. A digitalização no Sistema Único de Saúde (SUS) é fundamental para otimizar o atendimento, prever demandas, gerenciar filas e garantir que insumos cheguem onde são mais necessários, promovendo um acesso mais igualitário e eficiente para toda a população.</p>
        </div>
    `;
    res.send(htmlBase('Início - Gestão SUS', conteudo));
});

// Apresentação do aluno e escopo
app.get('/quemsou', (req, res) => {
    const conteudo = `
        <div class="card shadow-sm">
            <div class="card-body">
                <h2 class="card-title text-primary">Sobre a Desenvolvedora</h2>
                <p class="card-text fs-5 mt-3">Me chamo Luna, tenho 26 anos e estou no 3º semestre de Desenvolvimento de Software Multiplataforma na Fatec Zona Sul.</p>
                <h3 class="mt-4">Escopo do Projeto</h3>
                <p>O projeto consiste na criação de um webservice em Node.js para atuar como um painel de gestão hospitalar. Ele consome dados estáticos (arquivos JSON) para exibir serviços disponíveis, catalogar novas tecnologias médicas e relatar a situação de unidades de saúde em funcionamento, facilitando a tomada de decisão gerencial.</p>
            </div>
        </div>
    `;
    res.send(htmlBase('Quem Sou', conteudo));
});

// Rota /ofertas 
app.get('/ofertas', (req, res) => {
    let cards = '<div class="row">';
    ofertas.forEach(oferta => {
        cards += `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm border-success">
                    <div class="card-header bg-success text-white">
                        <h5 class="mb-0">${oferta.titulo}</h5>
                    </div>
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">Vagas Disponíveis: <strong>${oferta.vagas}</strong></h6>
                        <p class="card-text">${oferta.descricao}</p>
                    </div>
                </div>
            </div>
        `;
    });
    cards += '</div>';
    
    res.send(htmlBase('Ofertas de Serviços', `<h2 class="mb-4">Serviços e Programas Preventivos</h2>${cards}`));
});

// Rota Novas unidades, equipamentos ou medicamentos
app.get('/novos', (req, res) => {
    let cards = '<div class="row">';
    novos.forEach(item => {
        cards += `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <img src="${item.foto}" class="card-img-top" alt="${item.nome}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${item.nome}</h5>
                        <p class="card-text">${item.descricao}</p>
                    </div>
                </div>
            </div>
        `;
    });
    cards += '</div>';
    
    res.send(htmlBase('Novas Incorporações', `<h2 class="mb-4">Catálogo de Novidades</h2>${cards}`));
});

// Rota Auditoria/Gestão das unidades existentes
app.get('/seminovos', (req, res) => {
    let listGroup = '<div class="list-group shadow-sm">';
    seminovos.forEach(unidade => {
        
        const nomeUnidade = unidade.unidade || unidade['unidade</td>'];
        
        listGroup += `
            <div class="list-group-item list-group-item-action flex-column align-items-start mb-2">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-2 text-primary">${nomeUnidade}</h5>
                </div>
                <p class="mb-1 text-success"><strong>Ponto Forte:</strong> ${unidade.positivo}</p>
                <p class="mb-1 text-danger"><strong>Gargalo/Problema:</strong> ${unidade.negativo}</p>
            </div>
        `;
    });
    listGroup += '</div>';
    
    res.send(htmlBase('Auditoria de Unidades', `<h2 class="mb-4">Auditoria e Gestão (Pontos Fortes e Fracos)</h2>${listGroup}`));
});

// Inicialização do servidor
app.listen(6200, function(erro){
    if(erro){
        console.log("Ocorreu um erro ao iniciar o servidor");
    } else {
        console.log("Servidor iniciado com sucesso na porta 6200");
    }
});