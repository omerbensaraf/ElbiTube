import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPropertiesMinComponent } from './video-properties-min.component';

describe('VideoPropertiesMinComponent', () => {
  let component: VideoPropertiesMinComponent;
  let fixture: ComponentFixture<VideoPropertiesMinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoPropertiesMinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPropertiesMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
