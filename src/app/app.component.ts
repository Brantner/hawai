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
  categories$: Observable<Category[]>;

  constructor(private menuService: MenuService) {
    this.initCalendar();

    this.categories$ = menuService.getTodayMenu();
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
