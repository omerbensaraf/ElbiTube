
import { Component, ViewChild, Input, Output, ViewEncapsulation, EventEmitter, HostBinding, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'ngc-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  // Using view child reference with local view variable name
  @ViewChild('editableContentElement') editableContentElement: ElementRef;
  // Content that will be edited and displayed
  @Input() content;
  @Input() video;
  @Input() btnText;
  @Output() newComment = new EventEmitter();
  @Output() editSaved = new EventEmitter();
  @Output() editableInput = new EventEmitter();
  showEditor: boolean = false;
  enableNewComment: boolean = true;

  toggleEditor() {
    this.showEditor = !this.showEditor;
  }

  addNewComment() {
    this.newComment.emit(this.editableContentElement.nativeElement.value);
  }

  // This returns the content of our content editable
  getEditableContent() {
    return this.editableContentElement.nativeElement.value;
  }

  // This sets the content of our content editable
  setEditableContent(content) {
    this.editableContentElement.nativeElement.value =
      content;
  }

  onInput() {
    let content = this.getEditableContent();
    if (content != "") {
      this.enableNewComment = false;
    }
    else {
      this.enableNewComment = true;
    }
  }

  cancel() {
    this.showEditor = !this.showEditor;
    this.setEditableContent("");
  }
}
