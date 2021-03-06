import {Component, ViewEncapsulation} from "@angular/core";
import "moment/locale/ru.js";
import {MenuService, User, UserCalendar} from "./menu.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  selectedDate = new Date();
  user$: Observable<User>;
  userBalance$: Observable<number>;
  userCalendar: UserCalendar;

  constructor(private menuService: MenuService) {
    this.user$ = menuService.getCurrentUser().share();
    this.userBalance$ = menuService.getBalance().share();
    menuService.getUserCalendar(this.selectedDate).subscribe(calendar => this.userCalendar = calendar);
  }
}
