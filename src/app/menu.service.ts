import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class MenuService {

  private static API_URL: string = "/backend/api/user/menu/orderInfo/0/2016-12-5";

  createAuthorizationHeader() {
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' +
      btoa(""));
    return headers;
  }

  constructor(private http: Http) {
  }

  getTodayMenu(): Observable<Category[]> {

    return this.http.get(MenuService.API_URL, {headers: this.createAuthorizationHeader()})
      .map(res => {
        console.log(res);
        return res.json().Categories;
      })
      .catch(err => {
        console.log(err);
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
