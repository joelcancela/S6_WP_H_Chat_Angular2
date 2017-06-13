import {Injectable} from "@angular/core";
import {URLUSERS} from "../../constants/urls";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserService {
  private userFetchUrl: string;
  private userMP: Subject<string>;
  currentUserMP: Observable<string>;
  currentMP: string;

  constructor(private http: Http) {
    this.userFetchUrl = URLUSERS;
    this.userMP = new Subject();
    this.currentUserMP = this.userMP.asObservable();
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
    this.userMP.next(name);
  }


}
