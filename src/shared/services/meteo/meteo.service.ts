import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {URLMETEO} from "shared/constants/urls";
import {OPENWEATHERAPIKEY} from "shared/constants/keys";
import {Observable} from "rxjs/Observable";

@Injectable()
export class MeteoService {

  constructor(private http: Http) {
  }

  public getMeteo(cmd: string): Promise<any> {
    const reg = /\/meteo ([^\t\n]+)/;
    const city = cmd.match(reg)[1];
    let temp, wind, description;
    return this.http.get(URLMETEO + city + "&appid=" + OPENWEATHERAPIKEY)
      .map((response) => {
        description = response.json()["weather"][0]["description"];
        console.log(description);
        wind = response.json()["wind"]["speed"];
        console.log(wind);
        temp = response.json()["main"]["temp"] - 273.15;
        temp = temp.toFixed(2);
        console.log(temp);
        return "Météo à " + response.json()["name"] + ": " + description + ", " + temp + "°C, vent: " + wind + "m/s";
      }).catch((error: Response | any) => {
      return Observable.throw(error.json());
    }).toPromise();
  }

}
