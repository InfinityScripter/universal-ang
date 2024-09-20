import {Pipe, PipeTransform} from "@angular/core";


@Pipe ({standalone: true, name: 'maskEmail'})

export class MaskEmailPipe implements PipeTransform {
  transform(value: string): string {
    const [name, domain] = value.split('@');
    return `${name.slice(0, 3)}...@${domain}`;
  }
}
