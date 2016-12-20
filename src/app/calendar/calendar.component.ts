import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import * as moment from "moment";
import {UserCalendar} from "../menu.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() userCalendar: UserCalendar;
  @Input() date: Date;
  @Output() dateChange = new EventEmitter<Date>();

  selectableDates: Array<{date: Date, mode: string, clazz: string}> = [];

  ngOnInit(): void {
    this.selectableDates = Object.keys(this.userCalendar)
      .filter(dateStr => this.userCalendar[dateStr].Enabled)
      .map(dateStr => {
        return {date: moment(dateStr).startOf('day').toDate(), mode: "day", clazz: "selectable-day"};
      });
  }
}
