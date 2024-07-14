"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./src/app");
var PORTA = 3000;
app_1.default.listen(PORTA, function () {
    console.log("Servidor executando em http://localhost:".concat(PORTA));
});
