import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

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
