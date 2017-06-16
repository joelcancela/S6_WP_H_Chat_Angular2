import {Injectable} from "@angular/core";
import {usersURL} from "../../constants/urls";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserService {
  private userFetchUrl: string;
  private userMPSubject: Subject<string>;
  private nickSubject: Subject<string>;
  currentMPUserUpdate: Observable<string>;
  currentMP: string;
  public currentNick: string;
  currentNickUpdate: Observable<string>;

  constructor(private http: Http) {
    this.userFetchUrl = usersURL;
    this.userMPSubject = new Subject();
    this.nickSubject = new Subject();
    this.currentMPUserUpdate = this.userMPSubject.asObservable();
    this.currentNickUpdate = this.nickSubject.asObservable();
    this.currentNick = localStorage.getItem("nickname");
    if (this.currentNick === "" || this.currentNick === null) {
      this.currentNick = "user";
      localStorage.setItem("nickname", this.currentNick);
    }
    this.nickSubject.next(name);
  }

  public getUsers(): Promise<any> {
    return this.http.get(this.userFetchUrl).map((response) => {
      return response.json();
    }).catch((error: Response | any) => {
      return Observable.throw(error.json());
    }).toPromise();
  }

  public updateUserMP(name: string) {
    if (this.currentMP === name) {
      return;
    }
    this.currentMP = name;
    this.userMPSubject.next(name);
  }

  public updateNick(newNick: string) {
    const letters = /[^A-Za-z+]/gi;
    const newNickTemp = newNick.replace(letters, "");
    let finalNick = newNickTemp.toLocaleLowerCase();
    if (finalNick === "") {
      finalNick = "user";
    }
    this.currentNick = finalNick;
    this.nickSubject.next(finalNick);
    localStorage.setItem("nickname", finalNick);
  }


}
