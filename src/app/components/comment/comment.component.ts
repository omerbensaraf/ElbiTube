import { Component, Input, Output, ViewChild, ViewEncapsulation, EventEmitter, OnInit } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';
// We use our fromNow pipe that converts timestamps to relative 
// times
import { FromNowPipe } from '../../pipes/from-now.pipe';
import { CommentService } from '../../services/comment.service';
import swal from 'sweetalert2';
import { ReplayStatus } from '../../models/comment.model';

@Component({
  selector: 'ngc-comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {
  // The time of the comment as a timestamp
  @Input() time;
  // The user object of the user who created the comment
  @Input() user;
  // The comment content
  @Input() content;

  @Input() video;

  @Input() commentId;

  ngOnInit() {
    this.commentService.updateComment().subscribe((replies: any) => {
      debugger;
      if (replies.length > 0 && this.commentId == replies[0].parent) {
        this.replies = replies;
        /*if(replies[0].user == this.user){
          swal('Thank for your comment', 'success');
        }*/
        
      }
    });
  }

  replies: Array<any> = [];

  showReplies: Boolean;
  replayText = ReplayStatus.VR;
  replayStatus: ReplayStatus = ReplayStatus.HR;
  constructor(private commentService: CommentService) { }

  @ViewChild(EditorComponent) newCommentEditor;

  viewReplies() {
    if (this.replayStatus == ReplayStatus.HR) {
      if (this.replies.length == 0) {
        this.commentService.getReplies(this.commentId).subscribe((res) => {
          debugger;
          this.replies = res;
          this.replayStatus = ReplayStatus.VR;
          this.replayText = ReplayStatus.HR;
          if (this.replies.length > 0) {
            this.showReplies = true;
          }
        });
      }
      else {
        this.replayStatus = ReplayStatus.VR;
        this.replayText = ReplayStatus.HR;
        this.showReplies = true;

      }
    }
    else {
      this.replayStatus = ReplayStatus.HR;
      this.replayText = ReplayStatus.VR;
      this.showReplies = false;
    }
  }


  addNewComment($event) {
    debugger;
    const comment = {
      parent: this.commentId,
      videoId: this.video,
      user: this.user,
      time: +new Date(),
      content: $event,
      disLikeUsers: [],
      likeUsers: [],
      counter : 1
    };
    /*this.commentService.postComment(comment).subscribe(data => {
      swal('Thank for your comment', 'success');
    });*/
    this.commentService.commentSocket(comment);

    // We reset the content of the editor
    this.newCommentEditor.setEditableContent('');
    this.newCommentEditor.showEditor = !this.newCommentEditor.showEditor;
  }
}



