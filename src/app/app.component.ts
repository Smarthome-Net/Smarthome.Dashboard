import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppSettingService } from '@services/app-setting-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet]
})
export class AppComponent {
    private appSettingService = inject(AppSettingService);

    constructor() {
        this.appSettingService.initSettings();
    }
}
