import { Component, Inject, Input, Output, ViewEncapsulation, ViewChild, EventEmitter, OnInit } from '@angular/core';
import {EditorComponent} from '../editor/editor.component';
import {CommentComponent} from '../comment/comment.component';
import {UsersService} from '../../services/users.service';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment.model';
@Component({
  selector: 'ngc-comments',
  styleUrls: ['./comments.component.scss'],
  // host: {
  //   class: 'comments'
  // },
  templateUrl: './comments.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CommentsComponent implements OnInit{
  hasComments : boolean;
  // A list of comment objects
  comments :  Array<Comment>;
  // Event when the list of comments have been updated
  @Output() commentsUpdated = new EventEmitter();
  // We are using an editor for adding new comments and control it 
  // directly using a reference
  @ViewChild(EditorComponent) newCommentEditor;

  // We're using the user service to obtain the currently logged 
  // in user
  constructor(private userService : UsersService, private commentService : CommentService) {
    this.userService = userService;
  }

  ngOnInit() {
    debugger;
    this.commentService.getAllComments().subscribe((res)=>{
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
    const comments = this.comments.slice();
    comments.splice(0, 0, {
      _id : "123",
      videoId : "123",
      user: this.userService.getUserEmail(),
      time: +new Date(),
      content: this.newCommentEditor.getEditableContent(),
      disLikeUsers:[],
      likeUsers:[]
    });
    // Emit event so the updated comment list can be persisted 
    // outside the component
    this.commentsUpdated.next(comments);
    // We reset the content of the editor
    this.newCommentEditor.setEditableContent('');
  }

  // This method deals with edited comments
  onCommentEdited(comment, content) {
    const comments = this.comments.slice();
    // If the comment was edited with e zero length content, we 
    // will delete the comment from the list
    if (content.length === 0) {
      comments.splice(comments.indexOf(comment), 1);
    } else {
      // Otherwise we're replacing the existing comment
      comments.splice(comments.indexOf(comment), 1, {
        _id : "123",
        videoId : "123",
        user: this.userService.getUserEmail(),
        time: +new Date(),
        content: this.newCommentEditor.getEditableContent(),
        disLikeUsers:[],
        likeUsers:[]
        /*user: comment.user,
        time: comment.time,
        content*/
      });
    }
    // Emit event so the updated comment list can be persisted 
    // outside the component
    this.commentsUpdated.next(comments);
  }
}