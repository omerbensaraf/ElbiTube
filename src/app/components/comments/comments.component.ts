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
  }
  
  addNewComment($event) {
    debugger;
    const comment =  {
      parent : null,
      videoId :this.video,
      user: this.userService.getUserEmail(),
      time: +new Date(),
      content: $event,
      disLikeUsers:[],
      likeUsers:[]
    };
    this.commentService.postComment(comment).subscribe(data=>{
      swal('Thank for your comment','success');
    });

    // We reset the content of the editor
    this.newCommentEditor.setEditableContent('');
    this.newCommentEditor.showEditor = !this.newCommentEditor.showEditor; 
  }
}