import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {URLTRAD} from "../../constants/urls";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TranslateService {

  constructor(private http: Http) {
  }

  public translate(cmd: string): Promise<any> {
    const language = new RegExp("[A-Z][A-Z]");
    const from = cmd.match(language);
    cmd = cmd.replace(language, "");
    const to = cmd.match(language);
    while (language.test(cmd)) {
      cmd = cmd.replace(language, "");
    }
    const text = cmd.substring(5);
    return this.http.get(URLTRAD + "?text=" + text + "&from=" + from + "&to=" + to)
      .map((response) => {
      return response.json()["translationText"];
    }).catch((error: Response | any) => {
      return Observable.throw(error.json());
    }).toPromise();
  }

}
