import {Component, OnInit, Input, Output, OnChanges} from '@angular/core';
import {VgAPI} from 'videogular2/core';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  preload: string = 'auto';
  api:VgAPI;
  @Input() videoUrl :String;
  @Output() onEnded:EventEmitter<any> = new EventEmitter();
  @Output() onLoad:EventEmitter<any> = new EventEmitter();

  constructor() {}

  onPlayerReady(api:VgAPI) {
    debugger;
    this.api = api;
    this.api.getDefaultMedia().subscriptions.loadStart.subscribe(
      () => {
        this.onLoad.emit();
      }
    );
    this.api.getDefaultMedia().subscriptions.ended.subscribe(
        () => {
          this.onEnded.emit();
        }
      );
      
  }

  playVideo() {
    debugger;
    this.api.play();
  }


}
