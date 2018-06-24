import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayedVideoPropertiesComponent } from './displayed-video-properties.component';

describe('DisplayedVideoPropertiesComponent', () => {
  let component: DisplayedVideoPropertiesComponent;
  let fixture: ComponentFixture<DisplayedVideoPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayedVideoPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayedVideoPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
