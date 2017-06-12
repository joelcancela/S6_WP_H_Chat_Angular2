import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response} from "@angular/http";
import {URLSERVER} from "shared/constants/urls";
import {ChanelModel} from "../../models/ChannelModel";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class ChannelService {

  private url: string;

  constructor(private http: Http) {
    this.url = URLSERVER;
  }

  public retrieveChannels(): Promise<any> {
    return this.http.get(this.url)
      .map(response => {
        return this.extractResponseAndUpdateChannelList(response)
      }).catch((error: Response | any) => {
        return Observable.throw(error.json());
      }).toPromise();
  }

  private extractResponseAndUpdateChannelList(response: Response): ChanelModel[] {
    return response.json() || [];
  }
}
