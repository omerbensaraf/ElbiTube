import { Component, ViewChild, Input, Output, ViewEncapsulation, EventEmitter, HostBinding, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'ngc-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],        // toggled buttons
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'color': [] }],          // dropdown with defaults from theme
      ['link']                         // link and image, video
    ]
  };

  @Input() content;
  @Input() btnText;
  @Output() newComment = new EventEmitter();
  @Output() editSaved = new EventEmitter();
  @Output() editableInput = new EventEmitter();
  showEditor: boolean = false;
  disabledNewComment: boolean = true;
  htmlFormat;
  toggleEditor() {
    this.showEditor = !this.showEditor;
  }

  
  addNewComment() {
    debugger;
    this.newComment.emit(this.htmlFormat);
  }

  setFocus(event) {
    event.focus();
  }

  //  This sets the content of our content editable
   setEditableContent(content) {
    this.htmlFormat = content;
   }

  setContent($event: any) {
    if ($event.text.toString().trim() != "") {
      this.disabledNewComment = false;
    }
    else {
      this.disabledNewComment = true;
    }
  }

  cancel() {
    this.showEditor = !this.showEditor;
    this.htmlFormat = "";
  }
}
