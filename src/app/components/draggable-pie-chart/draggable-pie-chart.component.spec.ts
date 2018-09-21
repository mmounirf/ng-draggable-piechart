import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggablePieChartComponent } from './draggable-pie-chart.component';

describe('DraggablePieChartComponent', () => {
  let component: DraggablePieChartComponent;
  let fixture: ComponentFixture<DraggablePieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraggablePieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggablePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
