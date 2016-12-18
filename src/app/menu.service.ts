import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs";
import * as moment from "moment";

const MENU_BASE_URL = "/api/user/menu/orderInfo/0/";
const DATE_FORMAT = "YYYY-MM-D";

@Injectable()
export class MenuService {

  createAuthorizationHeader() {
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' +
      btoa("dmitry.zamula:Nelenis100"));
    return headers;
  }

  constructor(private http: Http) {
  }

  addMenuItem(menuId: number): Observable<void> {
    return Observable.of(null);
  }

  removeMenuItem(menuId: number): Observable<void> {
    return Observable.of(null);
  }

  getMenuFor(date: Date): Observable<Category[]> {
    let menuUrl = MENU_BASE_URL + moment(date).format(DATE_FORMAT);

    return this.http.get(menuUrl, {headers: this.createAuthorizationHeader()})
      .map(res => {
        return res.json().Categories;
      })
      .catch(err => {
        return Observable.throw(err);
      });
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
