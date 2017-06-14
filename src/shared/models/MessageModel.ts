/**
 * Classe représentant object Message
 * Cet objet est renvoyé grâce à l'url /threads/:id/messages avec :id un nombre entier représentant l'id d'un Channel
 */
export class MessageModel {

  /**
   * Identifiant du message.
   */
  public id: number;

  /**
   * Contenu du message
   */
  public content: string;

  /**
   * Nom de la personne ayant envoyé le message
   */
  public from: string;

  /**
   * Date de création du message.
   */
  public createdAt: string;

  /**
   * Date de la mise à jour du message. Si le message n'a pas été mis à jour, par défaut la valeur sera la identique
   * à createdAt.
   */
  public updatedAt: string;

  /**
   * Identifiant de la thread
   */
  public threadId: number;

  /**
   * Url vers la vidéo youtube
   */
  public ytUrl: string;

  /**
   * Contient l'url vers l'image
   */
  public imgUrl: string;

  /**
   * Contient l'embed url vers le tweet
   */
  public tweet: string;

  /**
   * Contient l'embed url vers l'instagram
   */
  public instagram: string;

  constructor(id?: number, content?: string, from?: string, createdAt?: string, updatedAt?: string, threadId?: number) {
    this.id = id;
    this.content = content;
    this.from = from;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.threadId = threadId;
  }
}
