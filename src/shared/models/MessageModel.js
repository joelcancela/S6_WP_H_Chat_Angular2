"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Classe représentant object Message
 * Cet objet est renvoyé grâce à l'url /threads/:id/messages avec :id un nombre entier représentant l'id d'un Channel
 */
var MessageModel = (function () {
    function MessageModel(id, content, from, createdAt, updatedAt, threadId) {
        this.id = id;
        this.content = content;
        this.from = from;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.threadId = threadId;
    }
    return MessageModel;
}());
exports.MessageModel = MessageModel;
