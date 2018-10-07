import {Component, Input, Output, ViewEncapsulation, EventEmitter} from '@angular/core';
import {EditorComponent} from '../editor/editor.component';
// We use our fromNow pipe that converts timestamps to relative 
// times
import {FromNowPipe} from '../../pipes/from-now.pipe';

@Component({
  selector: 'ngc-comment',
  host: {
    class: 'comment'
  },
  templateUrl: './comment.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CommentComponent {
  // The time of the comment as a timestamp
  @Input() time;
  // The user object of the user who created the comment
  @Input() user;
  // The comment content
  @Input() content;
  // If a comment was edited this event will be emitted
  @Output() commentEdited = new EventEmitter();

  onContentSaved(content) {
    this.commentEdited.next(content);
  }
}
