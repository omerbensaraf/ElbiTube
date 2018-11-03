import { Component, Inject, Input, Output, ViewEncapsulation, ViewChild, EventEmitter, OnInit } from '@angular/core';
import {EditorComponent} from '../editor/editor.component';
import {CommentComponent} from '../comment/comment.component';
import {UsersService} from '../../services/users.service';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment.model';
import swal from 'sweetalert2';
@Component({
  selector: 'ngc-comments',
  styleUrls: ['./comments.component.scss'],
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit{
  hasComments : boolean;
  // A list of comment objects
  comments :  Array<Comment> = [];

  // We are using an editor for adding new comments and control it 
  // directly using a reference
  @ViewChild(EditorComponent) newCommentEditor;

  @Input() video;

  constructor(private userService : UsersService, private commentService : CommentService) {
    this.userService = userService;
  }

  ngOnInit() {
    this.commentService.getAllRootComments(this.video).subscribe((res)=>{
    this.comments = res;
    this.hasComments = this.comments.length > 0;
    });
    this.commentService.updateComment().subscribe((comments: any) => {
    if(comments.length > 0 && comments[0].parent == null){
      this.comments = comments;
      this.hasComments = true;
      /*if(comments[0].user == this.userService.getUserEmail()){
        swal('Thank for your comment','success');
      }*/
      
    }
  });
}

updateChild($event){
  this.comments.forEach(comment=>{
    if(comment._id === $event.commentId){
      comment.counter = $event.repliesCounter;
    }
  })
  debugger;
}

  addNewComment($event) {
    debugger;
    const comment =  {
      sname : "Comment",
      parent : null,
      videoId :this.video,
      user: this.userService.getUserEmail(),
      time: +new Date(),
      content: $event,
      disLikeUsers:[],
      likeUsers:[],
      counter : 1
    };
    this.commentService.commentSocket(comment);/*.subscribe(data=>{
      swal('Thank for your comment','success');
    });*/

    // We reset the content of the editor
    this.newCommentEditor.setEditableContent('');
    this.newCommentEditor.showEditor = !this.newCommentEditor.showEditor; 
  }
}