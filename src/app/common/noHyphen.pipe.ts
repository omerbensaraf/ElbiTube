import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'removeHyphen'})

export class NoHyphenPipe implements PipeTransform {
    transform(value: string): string {
        return value.split('-').join(' ');
    }
}
