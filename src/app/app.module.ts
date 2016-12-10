import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {DatepickerModule} from "ng2-bootstrap";
import {MenuService} from "./menu.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    DatepickerModule
  ],
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
