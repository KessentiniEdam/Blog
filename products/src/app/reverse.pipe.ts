import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  standalone: true
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value !== 'string') return value;
    return value.split('').reverse().join('');
  }
}
