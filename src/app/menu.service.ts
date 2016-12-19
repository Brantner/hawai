import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs";
import * as moment from "moment";

const MENU_BASE_URL = "/api/user/menu/orderInfo/0/";
const BALANCE_BASE_URL = "/api/user/balance/";
const ADD_ITEM_BASE_URL = "/api/user/buy/0/";
const REMOVE_ITEM_BASE_URL = "/api/user/cancel/0/";
const DATE_FORMAT = "YYYY-MM-D";

@Injectable()
export class MenuService {

  constructor(private http: Http) {
  }

  addMenuItem(menuId: number): Observable<void> {
    let addItemUrl = ADD_ITEM_BASE_URL + menuId;
    return this.http.post(addItemUrl, undefined, {headers: this.createAuthorizationHeader()})
      .map(res => undefined)
      .catch(err => Observable.throw(err));
  }

  removeMenuItem(menuId: number): Observable<void> {
    let removeItemUrl = REMOVE_ITEM_BASE_URL + menuId;
    return this.http.post(removeItemUrl, undefined, {headers: this.createAuthorizationHeader()})
      .map(res => undefined)
      .catch(err => Observable.throw(err));
  }

  getMenuFor(date: Date): Observable<Category[]> {
    let menuUrl = MENU_BASE_URL + moment(date).format(DATE_FORMAT);
    return this.http.get(menuUrl, {headers: this.createAuthorizationHeader()})
      .map(res => res.json().Categories)
      .catch(err => Observable.throw(err));
  }

  getBalance() {
    let balanceUrl = BALANCE_BASE_URL + moment().format(DATE_FORMAT);
    return this.http.get(balanceUrl, {headers: this.createAuthorizationHeader(), search: "userid=0"})
      .map(res => res.json().Balance)
      .catch(err => Observable.throw(err));
  }

  private createAuthorizationHeader() {
    return new Headers({Authorization: 'Basic ' + btoa("")});
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
