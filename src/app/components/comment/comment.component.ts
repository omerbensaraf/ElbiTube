import { Component,SimpleChanges, Input, Output, ViewChild, ViewEncapsulation, EventEmitter, OnInit,OnChanges } from '@angular/core';
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
export class CommentComponent implements OnInit,OnChanges {
  // The time of the comment as a timestamp
  @Input() time;
  // The user object of the user who created the comment
  @Input() user;
  // The comment content
  @Input() content;
  @Input() comment;
  @Input() video;

  @Input() commentId;

  @Input() repliesCounter;

  @Output() updateParent = new EventEmitter();
  repliesCount : number;
  
  ngOnInit() {
  this.repliesCount = this.repliesCounter;
  //this.replayText = "View " + this.repliesCount + " replies"; 
  this.replayText = "View replies"; 
    this.commentService.updateComment().subscribe((replies: any) => {
      debugger;
      if (replies.length > 0 && this.commentId == replies[0].parent) {
        this.replies = replies;
        this.repliesCount = replies.length;

        this.updateParent.emit({commentId : this.commentId,repliesCounter: this.replies.length});
      }
    });
  }

  updateChild($event){
    this.replies.forEach(replay=>{
      if(replay._id === $event.commentId){
        replay.counter = $event.repliesCounter;
      }
    })
    debugger;
  }

  ngOnChanges(changes : SimpleChanges) {
    debugger;
  }


  replies: Array<any> = [];

  showReplies: Boolean;
  replayText;// = ReplayStatus.VR;
  replayStatus: ReplayStatus = ReplayStatus.HR;
  constructor(private commentService: CommentService) { }

  @ViewChild(EditorComponent) newCommentEditor;

  viewReplies() {
    debugger;
    //TODO change to this.replies.length == 0
    if (this.replayStatus == ReplayStatus.HR) {
      if (this.replies.length >= 0) {
        this.commentService.getReplies(this.commentId).subscribe((res) => {
          debugger;
          this.replies = res;
          this.replayStatus = ReplayStatus.VR;
          //this.replayText = ReplayStatus.HR;
          //this.replayText = "Hide " + this.replies.length + " replies"; 
          this.replayText = "Hide replies"; 
          if (this.replies.length > 0) {
            this.showReplies = true;
          }
        });
      }
      else {
        this.replayStatus = ReplayStatus.VR;
        //this.replayText = ReplayStatus.HR;
        //this.replayText = "Hide " + this.replies.length + " replies";
        this.replayText = "Hide replies";
        this.showReplies = true;

      }
    }
    else {
      this.replayStatus = ReplayStatus.HR;
      //this.replayText = ReplayStatus.VR;
      //this.replayText = "View " + this.replies.length + " replies";
      this.replayText = "View replies";
      this.showReplies = false;
    }
  }


  addNewComment($event) {
    debugger;
    const comment = {
      sname : "Comment",
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



