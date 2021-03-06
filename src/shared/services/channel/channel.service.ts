import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {serverURL} from "shared/constants/urls";
import {ChanelModel} from "../../models/ChannelModel";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {Subject} from "rxjs/Subject";

/**
 * Manages the current channel and the request for channel pagination.
 */
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
  //
  inRefresh = false;

  constructor(private http: Http) {
    this.url = serverURL + "/threads/";
    // Observable for channel ID
    this.currentChannelSubject = new Subject();
    this.currentChannelUpdate = this.currentChannelSubject.asObservable();
    // Observable for channel list
    this.channelListSubject = new Subject();
    this.channelListUpdate = this.channelListSubject.asObservable();
    //
    this.inRefresh = true;
    this.update();
  }

  /**
   * Changes the current channel.
   * @param newValue the new channel id
   */
  updateChannelID(newValue: number) {
    this.currentChannelID = newValue;
    this.currentChannelSubject.next(this.currentChannelID);
  }

  /**
   * Updates the content of the channel page obeservable.
   * @param array 20 or less channels
   */
  updateChannelList(array) {
    if (array == null || array.length === 0) {
      clearInterval(this.timer);
      this.inRefresh = false;
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

  /**
   * Requests a page of channel names.
   */
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

  /**
   * Resets all known channels.
   */
  resetChannels() {
    if (!this.inRefresh) {
      this.channelList = [];
      this.pageNumber = 0;
      this.inRefresh = true;
      this.update();
    }
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
