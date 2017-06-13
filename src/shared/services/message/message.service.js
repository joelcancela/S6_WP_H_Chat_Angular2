"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var MessageModel_1 = require("../../models/MessageModel");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var urls_1 = require("shared/constants/urls");
var MessageService = (function () {
    function MessageService(http) {
        this.http = http;
        this.url = urls_1.URLSERVER;
        this.messageList$ = new ReplaySubject_1.ReplaySubject(1);
        this.messageList$.next([new MessageModel_1.MessageModel()]);
    }
    /**
     * Fonction getMessage.
     * Cette fonction permet de récupérer la liste des messages pour un channel donné. Elle prend en parametre:
     * - route: La route. C'est la fin de l'url. Elle sera concaténée à l'attribut this.url pour former l'url complète.
     *          Pour l'envoie des messages la route doit avoir la structure suivante: :id/messages avec ":id" étant
     *          un nombre entier correspondant à l'identifiant (id) du channel.
     * Exemple de route: 1/messages
     * @param route
     * @returns {Observable<R>}
     */
    MessageService.prototype.getMessages = function (route) {
        var _this = this;
        var finalUrl = this.url + route;
        this.http.get(finalUrl)
            .subscribe(function (response) { return _this.extractAndUpdateMessageList(response); });
    };
    /**
     * Fonction sendMessage.
     * Cette fonction permet l'envoi d'un message. Elle prend en paramêtre:
     * - route: La route est la fin de l'url. Elle sera concaténée à l'attribut this.url pour former l'url complète. Pour
     *          l'envoie des messages la route doit avoir la structure suivante: :id/messages avec ":id" étant un nombre
     *          entier correspondant à l'identifiant (id) du channel.
     *          Exemple de route: 1/messages
     * - message: Le message à envoyer. Ce message est de type MessageModel.
     * @param route
     * @param message
     */
    MessageService.prototype.sendMessage = function (route, message) {
        var _this = this;
        console.log(this.url + route);
        var headers = new http_2.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers });
        console.log(message);
        var answer = this.http.post(this.url + route, message, options).map(function (res) { return res.json(); }).subscribe(function (response) {
            /* this function is executed every time there's a new output */
            console.log("VALUE RECEIVED: " + response);
            console.log(response);
            _this.extractMessageAndGetMessages(response, route);
        }, function (err) {
            /* this function is executed when there's an ERROR */
            console.log("ERROR: " + err);
        }, function () {
            /* this function is executed when the observable ends (completes) its stream */
            console.log("COMPLETED");
        });
        console.log(answer);
        console.log("message sent");
        // Je suis vide :(
        // Tu peux trouver des infos sur moi dans le README !
    };
    /**
     * Fonction extractAndUpdateMessageList.
     * Cette fonction permet d'extraire la liste des messages de la 'response' reçue et ensuite de mettre à jour la liste
     * des message dans l'observable messageList$.
     * Elle est appelée dans la fonction getMessages et permet de directement récuperer une liste de MessageModel. Pour récupérer
     * les données de la reponse, il suffit d'appeler la fonction .json() qui retourne le body de la réponse.
     * @param response
     */
    MessageService.prototype.extractAndUpdateMessageList = function (response) {
        // Plus d'info sur Response ou sur la fonction .json()? si tu utilises Webstorm,
        // fait CTRL + Click pour voir la déclaration et la documentation
        var messageList = response.json() || []; // ExtractMessage: Si response.json() est undefined ou null,
        // messageList prendra la valeur tableau vide: [];
        this.messageList$.next(messageList); // On pousse les nouvelles données dans l'attribut messageList$
    };
    /**
     * Fonction extractMessage.
     * Cette fonction permet d'extraire les données reçues à travers les requêtes HTTP. Elle est appelée dans la fonction
     * sendMessage et permet de directement récuperer un MessageModel.
     * Elle va également faire un nouvel appel pour récupérer la liste complete des messages pour pouvoir mettre à jour la
     * liste des messages dans les composants.
     * @param response
     * @param route
     * @returns {any|{}}
     */
    MessageService.prototype.extractMessageAndGetMessages = function (response, route) {
        this.getMessages(route);
        return response.json() || new MessageModel_1.MessageModel(); // A remplacer ! On retourne ici un messageModel vide seulement pour que Typescript ne lève pas d'erreur !
    };
    return MessageService;
}());
MessageService = __decorate([
    core_1.Injectable()
], MessageService);
exports.MessageService = MessageService;
