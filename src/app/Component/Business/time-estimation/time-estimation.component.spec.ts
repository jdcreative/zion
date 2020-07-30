import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEstimationComponent } from './time-estimation.component';

describe('TimeEstimationComponent', () => {
  let component: TimeEstimationComponent;
  let fixture: ComponentFixture<TimeEstimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEstimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
