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
  private pageNumber = 0;
  private timer: any;
  // Channel ID
  currentChannelID = -1;
  currentChannelSubject: Subject<number>;
  currentChannelUpdate: Observable<number>;
  // Channel list
  channelList: ChanelModel[] = [];
  channelListSubject: Subject<ChanelModel[]>;
  channelListUpdate: Observable<ChanelModel[]>;

  constructor(private http: Http) {
    this.url = URLSERVER + "/threads/";
    // Observable for channel ID
    this.currentChannelSubject = new Subject();
    this.currentChannelUpdate = this.currentChannelSubject.asObservable();
    // Observable for channel list
    this.channelListSubject = new Subject();
    this.channelListUpdate = this.channelListSubject.asObservable();
    //
    this.update();
  }

  updateChannelID(newValue: number) {
    this.currentChannelID = newValue;
    this.currentChannelSubject.next(this.currentChannelID);
  }

  updateChannelList(array) {
    if (array.length === 0) {
      clearInterval(this.timer);
      return;
    }
    this.channelList = this.channelList.concat(array);
    this.channelListSubject.next(this.channelList);
    if (this.pageNumber === 1) {
      this.updateChannelID(this.channelList[0].id);
    }
  }

  private extractResponseAndUpdateChannelList(response: Response): ChanelModel[] {
    return response.json() || [];
  }

  public getChannelList(): Observable<ChanelModel[]> {
    return this.channelListUpdate;
  }

  public getChannelPage(): Promise<any> {
    const request = this.http.get(this.url + "?page=" + this.pageNumber)
      .map(response => {
        return this.extractResponseAndUpdateChannelList(response);
      }).catch((error: Response | any) => {
        return Observable.throw(error.json());
      }).toPromise();
    this.pageNumber++;
    return request;
  }

  public addChannel(name: string): Promise<any> {
    const headers = new Headers({"Content-Type": "application/json"});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.url, {"name": name}, options)
      .map(response => {
        this.extractResponseAndUpdateChannelList(response);
      }).catch((error: Response | any) => {
        return Observable.throw(error.json());
      }).toPromise();
  }

  resetChannels() {
    this.channelList = [];
    this.pageNumber = 0;
    this.update();
  }

  private update() {
    this.timer = setInterval(() => {
      this.getChannelPage().then(array => this.updateChannelList(array));
    }, 100);

  }


  getChannelID(nameChannel: string) {
    for (let i = 0; i < this.channelList.length; i++) {
      if (this.channelList[i].name === nameChannel) {
        return this.channelList[i].id;
      }
    }
  }
}
