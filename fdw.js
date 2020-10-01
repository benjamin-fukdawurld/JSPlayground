const express = require('express');

var app = express();

app.get("/", function(req, res){
    res.setHeader("Content-Type", "text/plain");
    res.send("Vous êtes à l'accueil");
});

app.get("/home", function(req, res){
    res.setHeader("Content-Type", "text/plain");
    res.send("Vous êtes à l'accueil");
});

app.get("/contact", function(req, res){
    res.setHeader("Content-Type", "text/plain");
    res.send("Vous êtes sur la page de contact");
});

app.get("/projects", function(req, res){
    res.setHeader("Content-Type", "text/plain");
    res.send("Vous êtes sur la page de présentation des projets");
});

app.get("/projects/:projectName", function(req, res){
    res.setHeader("Content-Type", "text/plain");
    res.send("Vous êtes sur la page de présentation du projet " + req.params.projectName);
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8080);