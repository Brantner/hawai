import {Component} from "@angular/core";
import "moment/locale/ru.js";
import * as moment from "moment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectableDates: Array<{date: Date, mode: string, clazz: string}> = [];

  constructor() {
    const startOfMonth = moment().startOf('month');
    const endOfAccessiblePeriod = moment().isAfter(moment().day('Wednesday'))
      ? moment().endOf('week').add('1', 'week')
      : moment().endOf('week');


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
