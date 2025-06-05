import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustom'
})
export class MyCustomPipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}
