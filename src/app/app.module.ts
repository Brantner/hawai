import {BrowserModule} from "@angular/platform-browser";
import {NgModule, LOCALE_ID} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {DatepickerModule} from "ng2-bootstrap";
import {MenuService} from "./menu.service";
import {MenuComponent} from "./menu/menu.component";
import {CalendarComponent} from "./calendar/calendar.component";

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
    JsonpModule,
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
