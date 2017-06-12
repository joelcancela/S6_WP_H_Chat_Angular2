import {Injectable} from "@angular/core";
import {URLUSERS} from "../../constants/urls";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {
  private url: string;

  constructor(private http: Http) {
    this.url = URLUSERS;
  }

  public getUsers(): Promise<any> {
    return this.http.get(this.url).map((response) => {
      return response.json();
    }).catch((error: Response | any) => {
      return Observable.throw(error.json());
    }).toPromise();
  }


}
