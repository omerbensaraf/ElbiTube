import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPropertiesComponent } from './video-properties.component';

describe('VideoPropertiesComponent', () => {
  let component: VideoPropertiesComponent;
  let fixture: ComponentFixture<VideoPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
