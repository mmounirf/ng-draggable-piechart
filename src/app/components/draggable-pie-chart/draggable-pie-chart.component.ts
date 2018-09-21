import { Component, OnInit, Output, EventEmitter, OnChanges, Input, SimpleChange, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import * as DraggablePieChart from '../../../assets/draggable-piechart.js';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
  selector: 'app-draggable-pie-chart',
  templateUrl: './draggable-pie-chart.component.html',
  styleUrls: ['./draggable-pie-chart.component.css']
})

export class DraggablePieChartComponent implements OnInit{
  @Input() data: any[];
  @Output() sliceDragged: EventEmitter<any> = new EventEmitter<any>();
  changeDetection: ChangeDetectionStrategy.OnPush;
  pieChart: DraggablePiechart
  constructor() { }

  ngOnInit() {
    this.renderPie();
  }

  onPieChartChange = (piechart) => {
    this.uiValuesMapper(piechart.getAllSliceSizePercentages())
  }

  renderPie(data) {
    this.pieChart = new DraggablePiechart({
      canvas: document.getElementById('piechart'),
      onchange: this.onPieChartChange,
      proportions: this.data,
      collapsing: false
    });
  }

  uiValuesMapper(values) {
    const data = values.map((value, index) => {
      return {label: this.data[index].format.label, color: this.data[index].format.color, value: value}
    });
    this.sliceDragged.emit(data);
  }

}
