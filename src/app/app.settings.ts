import { Injectable } from "@angular/core";
import { Settings } from "./app.settings.model";

@Injectable()
export class AppSettings {
  public settings = new Settings(
    "Horizon Cars", //theme name
    false, //loadingSpinner
    true, //fixedHeader
    true, //fixedSidenav
    false, //fixedSidenavUserContent
    false, //fixedFooter
    true, //sidenavIsOpened
    true, //sidenavIsPinned
    "vertical", //horizontal , vertical
    "default", //default, compact, mini
    "gray-light", //indigo-light, teal-light, red-light, gray-light, indigo-light, blue-dark, green-dark, pink-dark, gray-dark
    false // true = rtl, false = ltr
  );
}
