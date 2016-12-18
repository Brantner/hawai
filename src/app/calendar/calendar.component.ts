import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import * as moment from "moment";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() date;
  @Output() dateChange = new EventEmitter<Date>();

  selectableDates: Array<{date: Date, mode: string, clazz: string}> = [];

  ngOnInit(): void {
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
