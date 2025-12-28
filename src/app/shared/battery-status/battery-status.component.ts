import { Component, input } from '@angular/core';
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

  //the battery status value between 0 and 1
  readonly value = input(0);

  resolveIcon() {
    //the value is higher than 0.875
    if (this.isFull()) {
      return 'battery_full'
    }

    //the value is range of any threshold value
    if (this.isInRange(batteryThresholds.high, batteryThresholds.veryHigh)) {
      return 'battery_6_bar'
    }
    if (this.isInRange(batteryThresholds.lessHigh, batteryThresholds.high)) {
      return 'battery_5_bar'
    }
    if (this.isInRange(batteryThresholds.half, batteryThresholds.lessHigh)) {
      return 'battery_4_bar'
    }
    if (this.isInRange(batteryThresholds.lessHalf, batteryThresholds.half)) {
      return 'battery_3_bar'
    }
    if (this.isInRange(batteryThresholds.low, batteryThresholds.lessHalf)) {
      return 'battery_2_bar'
    }
    if (this.isInRange(batteryThresholds.veryLow, batteryThresholds.low)) {
      return 'battery_1_bar'
    }

    //if all previous checks fail the value is below 0.125
    return 'battery_0_bar'
  }

  private isFull() {
    return this.value() >= batteryThresholds.veryHigh;
  }

  private isInRange(min: number, max: number) {
    return this.value() >= min && this.value() < max;
  }
}
