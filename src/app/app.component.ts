import { Component, OnInit, ViewChild} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  @ViewChild('pieComp') pieComp;

  pieData = [
    { proportion: 20, format: { color: '#de3832', label: 'Angular'} },
    { proportion: 10, format: { color: '#61dafb', label: 'React'} },
    { proportion: 2, format: { color: '#744cbc', label: 'Redux'} },
    { proportion: 50, format: { color: '#c6538c', label: 'SASS'} },
    { proportion: 15, format: { color: '#c2185b', label: 'RxJS'} }
  ];
  uiData: any[];
  constructor() {

  }
  ngOnInit() {

  }

  sliceDragged($event) {
    this.uiData = $event;
  }

  colorSelected(newColor, index) {
    this.pieData[index].format.color = newColor;
    this.pieComp.renderPie();
  }

  updateLabel(newLabel, index) {
    this.pieData[index].format.label = newLabel;
    this.pieComp.renderPie();
  }

  updateValue(newValue, index) {
    this.pieData[index].proportion = parseFloat(newValue);
    this.pieComp.renderPie();
  }

}
