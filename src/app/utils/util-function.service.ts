import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class UtilFunctionService {
  constructor() {}

  convertApiDate(date: string, format: string): string {
    return moment(date).format(format ? format : "DD/MM/YYYY");
  }
}
