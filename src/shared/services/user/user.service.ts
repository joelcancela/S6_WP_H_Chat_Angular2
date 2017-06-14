import {Injectable} from "@angular/core";
import {URLUSERS} from "../../constants/urls";
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
  currentNick: string;
  currentNickUpdate: Observable<string>;

  constructor(private http: Http) {
    this.userFetchUrl = URLUSERS;
    this.userMPSubject = new Subject();
    this.nickSubject = new Subject();
    this.currentMPUserUpdate = this.userMPSubject.asObservable();
    this.currentNickUpdate = this.nickSubject.asObservable();
    this.currentNick = localStorage.getItem("nickname");
    if (this.currentNick === "" || this.currentNick === null) {
      this.currentNick = "tigli";
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
    this.currentMP = name;
    this.userMPSubject.next(name);
  }

  public updateNick(newNick: string) {
    this.currentNick = newNick;
    this.nickSubject.next(newNick);
    localStorage.setItem("nickname", newNick);
  }


}
