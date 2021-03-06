import {Pipe, PipeTransform} from "@angular/core";
import {DatePipe} from "@angular/common";

@Pipe({
  name: "dateFormat"
})
export class DateFormatPipe implements PipeTransform {

  transform(date: any, args?: any): any {
    if (date == null) {
      return null;
    }
    const currentDate = new Date();
    const day = currentDate.getDay();
    const dateA = new Date(date);
    const datePipe = new DatePipe("fr-FR");
    if (day === dateA.getDay()) {
      return datePipe.transform(dateA, "H:mm");
    } else {
      return datePipe.transform(dateA, "dd/MM/yyyy - H:mm");
    }
  }

}
