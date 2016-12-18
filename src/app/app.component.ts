import {Component, ViewEncapsulation} from "@angular/core";
import "moment/locale/ru.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  selectedDate = new Date();
}
