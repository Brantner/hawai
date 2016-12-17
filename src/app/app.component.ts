import {Component} from "@angular/core";
import "moment/locale/ru.js";
import * as moment from "moment";
import {MenuService, Category} from "./menu.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectableDates: Array<{date: Date, mode: string, clazz: string}> = [];
  selectedDate = new Date();
  categories$: Observable<Category[]>;
  totalCount$: Observable<number>;

  constructor(public menuService: MenuService) {
    this.initCalendar();
    this.reload();
  }

  private reload() {
    this.categories$ = this.menuService.getTodayMenu();
    this.totalCount$ = this.categories$
      .flatMap(categories => categories)
      .flatMap(category => category.Menus)
      .reduce((acc, menu) => acc + menu.Price * menu.quantity, 0);
  }

  addMenuItem(menuId: number) {
    this.menuService.addMenuItem(menuId).subscribe(() => this.reload());
  }

  removeMenuItem(menuId: number) {
    this.menuService.removeMenuItem(menuId).subscribe(() => this.reload());
  }

  private initCalendar() {
    const startOfMonth = moment().startOf('month');
    const endOfAccessiblePeriod = moment().isAfter(moment().isoWeekday(3))
      ? moment().endOf('isoWeek').add('1', 'week')
      : moment().endOf('isoWeek');


    let day = startOfMonth;
    while (day.isSameOrBefore(endOfAccessiblePeriod)) {
      if (this.isWeekend(day)) {
        this.selectableDates.push({date: day.toDate(), mode: 'day', clazz: 'selectable-day'});
      }
      day.add('1', 'day');
    }
  }

  private isWeekend(day: moment.Moment) {
    return (day.day() != 6) && (day.day() != 0);
  }
}
