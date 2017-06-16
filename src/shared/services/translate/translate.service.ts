import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {tradURL} from "../../constants/urls";
import {translateKey} from "../../constants/keys";

@Injectable()
export class TranslateService {

  constructor(private http: Http) {
  }

  public translate(cmd: string): Promise<any> {
    cmd = cmd.substring(5);
    const language = new RegExp("[a-z][a-z]");
    const from = cmd.match(language)[0];
    cmd = cmd.replace(language, "");
    const to = cmd.match(language)[0];
    cmd = cmd.replace(language, "");
    return this.http.get(tradURL + "?key=" + translateKey + "&text=" + cmd + "&lang=" + from + "-" + to)
      .map((response) => {
        return response.json()["text"][0];
      }).catch((error: Response | any) => {
        console.log(error);
        return [];
      }).toPromise();
  }

}
