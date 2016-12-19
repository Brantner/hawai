import {Component, ViewEncapsulation} from "@angular/core";
import "moment/locale/ru.js";
import {MenuService} from "./menu.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  selectedDate = new Date();
  userBalance$: Observable<number>;

  constructor(private menuService: MenuService) {
    this.userBalance$ = menuService.getBalance().share();
  }
}
