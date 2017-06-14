import {Pipe, PipeTransform} from "@angular/core";
import {DatePipe} from "@angular/common";

@Pipe({
  name: "dateFormat"
})
export class DateFormatPipe implements PipeTransform {

  transform(date: any, args?: any): any {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const dateA = new Date(date);
    const datePipe = new DatePipe("fr-FR");
    if (day === dateA.getDay()) {
      return datePipe.transform(dateA, "H:m");
    } else {
      return datePipe.transform(dateA, "dd/MM/yyyy - H:m");
    }
  }

}
