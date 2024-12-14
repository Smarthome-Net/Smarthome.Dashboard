import { Component, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { PercentPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

const batteryThresholds = {
  veryHigh: 0.875,
  high: 0.75,
  lessHigh: 0.675,
  half: 0.5,
  lessHalf: 0.375,
  low: 0.25,
  veryLow: 0.125
}


@Component({
    selector: 'app-battery-status',
    templateUrl: './battery-status.component.html',
    styleUrls: ['./battery-status.component.scss'],
    imports: [MatTooltip, MatIcon, PercentPipe]
})
export class BatteryStatusComponent {

  @Input()
  value = 0;

  batteryThresholds = batteryThresholds;

  isFull() {
    return this.value >= this.batteryThresholds.veryHigh;
  }

  isEmpty() {
    return this.value <= this.batteryThresholds.veryLow;
  }

  isInRange(min: number, max: number) {
    return this.value >= min && this.value < max;
  }
}
