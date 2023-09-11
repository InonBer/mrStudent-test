import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorTableComponent } from './monitor-table.component';

describe('MonitorTableComponent', () => {
  let component: MonitorTableComponent;
  let fixture: ComponentFixture<MonitorTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonitorTableComponent]
    });
    fixture = TestBed.createComponent(MonitorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
