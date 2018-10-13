
import { Component, ViewChild, Input, Output, ViewEncapsulation, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'ngc-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  // Using view child reference with local view variable name
  @ViewChild('editableContentElement') editableContentElement;
  // Content that will be edited and displayed
  @Input() content;
  @Input() video;
  @Input() btnText;
  @Output() editSaved = new EventEmitter();
  @Output() editableInput = new EventEmitter();
  showEditor : boolean = false;
  input : boolean = true;
  // We need to make sure to reflect to our editable element if 
  // content gets updated from outside
  ngOnChanges() {
    if (this.editableContentElement && this.content) {
      this.setEditableContent(this.content);
    }
  }

  toggleEditor(){
    this.showEditor = !this.showEditor;
  }


  ngAfterViewInit() {
    this.setEditableContent(this.content);
  }

  // This returns the content of our content editable
  getEditableContent() {
    return this.editableContentElement.nativeElement.textContent;
  }

  // This sets the content of our content editable
  setEditableContent(content) {
    this.editableContentElement.nativeElement.textContent =
      content;
  }

  // This annotation will create a click event listener on the 
  // host element that will invoke the underlying method
  /*@HostListener('click')
  focusEditableContent() {
    if (this.editMode) {
      this.editableContentElement.nativeElement.focus();
    }
  }*/

  // Method that will be invoked if our editable element is 
  // changed
  onInput() {
    // Emit a editableInput event with the edited content
    let content = this.getEditableContent();
    if(content != ""){
      this.input = true;
    }
    else{
      this.input = false;
    }
    
    this.editableInput.next(content);
  }

  // On save we reflect the content of the editable element into 
  // the content field and emit an event
  save() {
    this.editSaved.next(this.getEditableContent());
    this.setEditableContent(this.content);
    // Setting editMode to false to switch the editor back to 
    // viewing mode
    //this.editMode = false;
  }

  // Canceling the edit will not reflect the edited content and 
  // switch back to viewing mode
  cancel() {
    debugger;
    this.showEditor = ! this.showEditor;
    this.setEditableContent(this.content);
    this.editableInput.next(this.getEditableContent());
    //this.editMode = false;
  }

  


}
