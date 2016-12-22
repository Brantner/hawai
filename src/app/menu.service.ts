import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs";
import * as moment from "moment";

const MENU_BASE_URL = "/api/user/menu/orderInfo/0/";
const ADD_ITEM_BASE_URL = "/api/user/buy/0/";
const REMOVE_ITEM_BASE_URL = "/api/user/cancel/0/";
const CURRENT_USER_URL = "/api/user/current";
const BALANCE_BASE_URL = "/api/user/balance/";
const USER_CALENDAR_BASE_URL = "/api/user/calendar/";
const DATE_FORMAT = "YYYY-MM-D";

@Injectable()
export class MenuService {

  constructor(private http: Http) {
  }

  addMenuItem(menuId: number): Observable<void> {
    return this.post(ADD_ITEM_BASE_URL + menuId)
      .map(res => undefined)
      .catch(err => Observable.throw(err));
  }

  removeMenuItem(menuId: number): Observable<void> {
    return this.post(REMOVE_ITEM_BASE_URL + menuId)
      .map(res => undefined)
      .catch(err => Observable.throw(err));
  }

  getMenuFor(date: Date): Observable<Category[]> {
    return this.get(MENU_BASE_URL + moment(date).format(DATE_FORMAT))
      .map(res => res.json().Categories)
      .catch(err => Observable.throw(err));
  }

  getBalance(): Observable<number> {
    return this.get(BALANCE_BASE_URL + moment().format(DATE_FORMAT))
      .map(res => res.json().Balance)
      .catch(err => Observable.throw(err));
  }

  getCurrentUser(): Observable<User> {
    return this.get(CURRENT_USER_URL)
      .map(res => res.json())
      .catch(err => Observable.throw(err));
  }

  getUserCalendar(date: Date): Observable<UserCalendar> {
    return this.get(USER_CALENDAR_BASE_URL + moment(date).format(DATE_FORMAT))
      .map(res => res.json())
      .catch(err => Observable.throw(err));
  }

  private get(url: string) {
    return this.http.get(url, {headers: this.createAuthorizationHeader()});
  }

  private post(url: string, body?: any) {
    return this.http.post(url, body, {headers: this.createAuthorizationHeader()});
  }

  private createAuthorizationHeader() {
    return new Headers({Authorization: 'Basic ' + "ZXVnZW5lLm5hemFyY2h1azpUaGFuYXRlcm9zMTk5MA=="});
  }
}

export interface Category {
  Color: string;
  Id: number;
  Image: string;
  Menus: Array<Menu>;
  Ordered: boolean;
  Title: string;
}

export interface Menu {
  Date: string;
  Id: number;
  Price: number;
  Title: string;
  Weight: string;
  quantity: number;
}

export interface User {
  Id: number;
  Name: string;
  IsAdmin: boolean;
  Company: string;
}

export interface UserCalendar {
  [date: string]: UserCalendarDay
}

export interface UserCalendarDay {
  Enabled: boolean;
  HasOrders: boolean;
}
