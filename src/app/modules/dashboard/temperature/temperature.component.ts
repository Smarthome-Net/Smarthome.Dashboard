import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-temperature',
    templateUrl: './temperature.component.html',
    styleUrls: ['./temperature.component.scss'],
    imports: [RouterOutlet]
})
export class TemperatureComponent {

  constructor() { }
}
