import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZionSSTComponent } from './zion-sst.component';

describe('ZionSSTComponent', () => {
  let component: ZionSSTComponent;
  let fixture: ComponentFixture<ZionSSTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZionSSTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZionSSTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
