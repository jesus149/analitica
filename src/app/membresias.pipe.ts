import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'membresias'
})
export class MembresiasPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
