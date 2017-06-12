import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response} from "@angular/http";
import {URLSERVER} from "shared/constants/urls";
import {ChanelModel} from "../../models/ChannelModel";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import "rxjs/Rx";
import {Observer} from "rxjs/Observer";

@Injectable()
export class ChannelService {

  private url: string;
  currentChannelID: number = 1;
  currentChannelIDUpdate: Observable<number>;
  currentChannelIDObserver: Observer<number>;

  constructor(private http: Http) {
    this.url = URLSERVER;
    this.currentChannelIDUpdate = Observable.create((observer: Observer<number>) => {
      this.currentChannelIDObserver = observer;
    });
  }

  updateChannelID(newValue: number) {
    this.currentChannelID = newValue;
    this.currentChannelIDObserver.next(this.currentChannelID);
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

  public getChannelNumber(): Observable<number> {
    return this.currentChannelIDUpdate;
  }
}