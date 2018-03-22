"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const http_1 = require("@angular/http");
const core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
let ContatoService = class ContatoService {
    constructor(http) {
        this.http = http;
        this.apiUrl = 'app/contatos';
        this.headers = new http_1.Headers({ 'content-Type': 'application/json' });
    }
    create(contato) {
        return this.http
            .post(this.apiUrl, JSON.stringify(contato), { headers: this.headers })
            .toPromise()
            .then((response) => {
            return response.json().data;
        })
            .catch(this.handleError);
    }
    update(contato) {
        const urlUpdate = `${this.apiUrl}/${contato.id}`; //app/contatos:id
        return this.http
            .put(urlUpdate, JSON.stringify(contato), { headers: this.headers })
            .toPromise()
            .then(() => contato)
            .catch(this.handleError);
    }
    delete(contato) {
        const urlUpdate = `${this.apiUrl}/${contato.id}`; //app/contatos:id
        return this.http
            .delete(urlUpdate, { headers: this.headers })
            .toPromise()
            .then(() => contato)
            .catch(this.handleError);
    }
    getContatos() {
        return this.http.get(this.apiUrl)
            .toPromise()
            .then(response => {
            console.log(response.json().data);
            return response.json().data;
        });
    }
    getContato(id) {
        return this.getContatos()
            .then((contatos) => {
            return contatos.find((contato) => {
                return contato.id === id;
            });
        }).catch(this.handleError);
    }
    handleError(err) {
        console.log("Error: " + err);
        return Promise.reject(err.message || err);
    }
    search(termo) {
        return this.http
            .get(`${this.apiUrl}/?nome=${termo}`)
            .map((resp) => resp.json().data);
    }
};
ContatoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ContatoService);
exports.ContatoService = ContatoService;
//# sourceMappingURL=contato.service.js.map