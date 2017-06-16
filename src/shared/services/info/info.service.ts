import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

/**
 * Manages the top bar information string. Displays either the current channel or the
 * name of the user we're sending MPs to.
 */
@Injectable()
export class InfoService {
  currentInfo: string;
  private infoSubject: Subject<string>;
  currentInfoUpdate: Observable<string>;

  constructor() {
    this.infoSubject = new Subject();
    this.currentInfoUpdate = this.infoSubject.asObservable();
  }

  public updateTitle(newTitle: string) {
    this.currentInfo = newTitle;
    this.infoSubject.next(newTitle);
  }

}
