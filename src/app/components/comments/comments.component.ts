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
  comments :  Array<Comment>;

  // We are using an editor for adding new comments and control it 
  // directly using a reference
  @ViewChild(EditorComponent) newCommentEditor;

  @Input() video;
  // We're using the user service to obtain the currently logged 
  // in user
  constructor(private userService : UsersService, private commentService : CommentService) {
    debugger;
    this.userService = userService;
  }

  ngOnInit() {
    this.commentService.getAllRootComments(this.video).subscribe((res)=>{
      debugger;
      this.comments = res
    this.hasComments = this.comments.length > 0;
  });
  }

  // We use input change tracking to prevent dealing with 
  // undefined comment list
  ngOnChanges(changes) {
    if (changes.comments && 
        changes.comments.currentValue === undefined) {
      this.comments = [];
    }
  }

  // Adding a new comment from the newCommentContent field that is 
  // bound to the editor content
  addNewComment() {
    debugger;
    const comment =  {
      parent : null,
      videoId :this.video,
      user: this.userService.getUserEmail(),
      time: +new Date(),
      content: this.newCommentEditor.getEditableContent(),
      disLikeUsers:[],
      likeUsers:[]
    };
    this.commentService.postComment(comment).subscribe(data=>{
      swal('Thank for your comment','success');
    });

    // We reset the content of the editor
    this.newCommentEditor.setEditableContent('');
  }
}