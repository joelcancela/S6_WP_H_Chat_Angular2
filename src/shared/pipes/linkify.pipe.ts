import {Pipe, PipeTransform} from "@angular/core";
import linkifyHtml from "linkifyjs/html";

@Pipe({name: "linkify"})
export class LinkifyPipe implements PipeTransform {
  transform(str: string): string {
    return str ? linkifyHtml(str, {target: "_blank"}) : str;
  }
}
