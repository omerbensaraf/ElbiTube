import { Component, Input, Output, ViewEncapsulation, EventEmitter, OnInit } from '@angular/core';
import {EditorComponent} from '../editor/editor.component';
// We use our fromNow pipe that converts timestamps to relative 
// times
import {FromNowPipe} from '../../pipes/from-now.pipe';

@Component({
  selector: 'ngc-comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit{
  // The time of the comment as a timestamp
  @Input() time;
  // The user object of the user who created the comment
  @Input() user;
  // The comment content
  @Input() content;

  ngOnInit() {debugger;}

  constructor(){
    debugger;
  }

}
