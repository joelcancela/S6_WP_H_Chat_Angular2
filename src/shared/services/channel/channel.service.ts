import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {URLSERVER} from "shared/constants/urls";
import {ChanelModel} from "../../models/ChannelModel";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ChannelService {

  private url: string;
  currentChannelID: number = 350;
  currentChannelSubject: Subject<number>;
  currentChannelUpdate: Observable<number>;

  constructor(private http: Http) {
    this.url = URLSERVER + "/threads/";
    this.currentChannelSubject = new Subject();
    this.currentChannelUpdate = this.currentChannelSubject.asObservable();
    this.retrieveChannels().then(number => this.currentChannelID = number[0].id);
  }

  updateChannelID(newValue: number) {
    this.currentChannelID = newValue;
    this.currentChannelSubject.next(this.currentChannelID);
  }

  public retrieveChannels(): Promise<any> {
    return this.http.get(this.url)
      .map(response => {
        return this.extractResponseAndUpdateChannelList(response);
      }).catch((error: Response | any) => {
        return Observable.throw(error.json());
      }).toPromise();
  }

  private extractResponseAndUpdateChannelList(response: Response): ChanelModel[] {
    return response.json() || [];
  }

  public getChannelNumber(): Observable<number> {
    return this.currentChannelUpdate;
  }

  public addChannel(name: string) {
    let headers = new Headers({"Content-Type": "application/json"});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url, {"name":name}, options)
      .map(response => {
        return this.extractResponseAndUpdateChannelList(response)
      }).catch((error: Response | any) => {
        return Observable.throw(error.json());
      }).toPromise();
  }
}
