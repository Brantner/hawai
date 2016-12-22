import {BrowserModule} from "@angular/platform-browser";
import {NgModule, LOCALE_ID} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {MenuService} from "./menu.service";
import {MenuComponent} from "./menu/menu.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {DatepickerModule} from "ng2-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DatepickerModule
  ],
  providers: [
    MenuService,
    {provide: LOCALE_ID, useValue: "ru-RU"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
