import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DraggablePieChartComponent } from './components/draggable-pie-chart/draggable-pie-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { MccColorPickerModule } from 'material-community-components';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DraggablePieChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MccColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
