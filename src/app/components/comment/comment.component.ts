import { Component,SimpleChanges, Input, Output, ViewChild, ViewEncapsulation, EventEmitter, OnInit,OnChanges } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';
// We use our fromNow pipe that converts timestamps to relative 
// times
import { FromNowPipe } from '../../pipes/from-now.pipe';
import { CommentService } from '../../services/comment.service';
import swal from 'sweetalert2';
import { ReplyStatus } from '../../models/comment.model';
import { UsersService } from '../../services/users.service';
import { DomSanitizer } from '@angular/platform-browser';

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
    this.content = this.sanitizer.bypassSecurityTrustHtml(this.content);
    debugger;
  this.repliesCount = this.repliesCounter;
  //this.replyText = "View " + this.repliesCount + " replies"; 
  this.replyText = "View replies"; 
  this.arrowClass="fa fa-angle-down";
    this.commentService.updateComment().subscribe((replies: any) => {
      debugger;
      if (replies.length > 0 && this.commentId == replies[0].parent) {
        this.replies = replies;
        this.repliesCount = replies.length;
        this.replyStatus = ReplyStatus.VR;
       
        this.replyText = "Hide replies";
        this.arrowClass="fa fa-angle-up"; 
        if (this.replies.length > 0) {
          this.showReplies = true;
        }
        this.updateParent.emit({commentId : this.commentId,repliesCounter: this.replies.length});
      }
    });
  }

  updateChild($event){
    this.replies.forEach(reply=>{
      if(reply._id === $event.commentId){
        reply.counter = $event.repliesCounter;
      }
    })
    debugger;
  }

  ngOnChanges(changes : SimpleChanges) {
    debugger;
  }


  replies: Array<any> = [];

  showReplies: Boolean;
  replyText;// = ReplyStatus.VR;
  arrowClass;
  replyStatus: ReplyStatus = ReplyStatus.HR;
  constructor(private sanitizer: DomSanitizer, private commentService: CommentService,private userService : UsersService) { }

  @ViewChild(EditorComponent) newCommentEditor;

  viewReplies() {
    debugger;
    //TODO change to this.replies.length == 0
    if (this.replyStatus == ReplyStatus.HR) {
      if (this.replies.length >= 0) {
        this.commentService.getReplies(this.commentId).subscribe((res) => {
          debugger;
          this.replies = res;
          this.replyStatus = ReplyStatus.VR;
          //this.replyText = ReplyStatus.HR;
          //this.replyText = "Hide " + this.replies.length + " replies"; 
          this.replyText = "Hide replies";
          this.arrowClass="fa fa-angle-up"; 
          if (this.replies.length > 0) {
            this.showReplies = true;
          }
        });
      }
      else {
        this.replyStatus = ReplyStatus.VR;
        this.replyText = "Hide replies";
        this.arrowClass="fa fa-angle-up";
        this.showReplies = true;

      }
    }
    else {
      this.replyStatus = ReplyStatus.HR;
      //this.replyText = ReplyStatus.VR;
      //this.replyText = "View " + this.replies.length + " replies";
      this.replyText = "View replies";
      this.arrowClass="fa fa-angle-down";
      this.showReplies = false;
    }
  }


  addNewComment($event) {
    debugger;
    const comment = {
      sname : "Comment",
      parent: this.commentId,
      videoId: this.video,
      user: this.userService.getUserEmail(),
      time: +new Date(),
      content: $event,
      disLikeUsers: [],
      likeUsers: [],
      counter : 1
    };

    this.commentService.commentSocket(comment);

    // We reset the content of the editor
    this.newCommentEditor.setEditableContent('');
    this.newCommentEditor.showEditor = !this.newCommentEditor.showEditor;
  }
}



