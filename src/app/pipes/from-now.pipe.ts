import {Pipe} from '@angular/core';
// We use the Moment.js library to convert dates to relative times
import * as moment_ from 'moment';

const moment = moment_;
@Pipe({
  // Specifying the name to be used within templates
  name: 'fromNow'
})
// Our pipe will transform dates and timestamps to relative times 
// using Moment.js
export class FromNowPipe {
  // The transform method will be called when the pipe is used 
  // within a template
  transform(value) {
    debugger;
    if (value && (value instanceof Date || 
        typeof value === 'number')) {
      return moment(value).fromNow();
    }
  }
}