import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {meteoURL} from "shared/constants/urls";
import {openWeatherAPIKey} from "shared/constants/keys";
import {Observable} from "rxjs/Observable";

/**
 * Manages the /meteo command.
 */
@Injectable()
export class MeteoService {

  constructor(private http: Http) {
  }

  public getMeteo(cmd: string): Promise<any> {
    const reg = /\/meteo ([^\t\n]+)/;
    const city = cmd.match(reg)[1];
    let temp, wind, description;
    return this.http.get(meteoURL + city + "&appid=" + openWeatherAPIKey + "&lang=fr")
      .map((response) => {
        description = response.json()["weather"][0]["description"];
        wind = response.json()["wind"]["speed"];
        temp = response.json()["main"]["temp"] - 273.15;
        temp = temp.toFixed(2);
        return "Météo à " + response.json()["name"] + ": " + description + ", " + temp + "°C, vent: " + wind + "m/s";
      }).catch((error: Response | any) => {
      return Observable.throw(error.json());
    }).toPromise();
  }

}
