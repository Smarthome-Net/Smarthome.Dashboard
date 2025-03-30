import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppSettingService } from '@services/app-setting-service';
import { StyleManagerService } from '@services/style-manager-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet]
})
export class AppComponent {
    private appSettingService = inject(AppSettingService);
    private styleManagerService = inject(StyleManagerService);

    constructor() {
        this.appSettingService.initSettings();

        this.appSettingService.$commonSetting.subscribe(commonSetting => {
            this.styleManagerService.setTheme(commonSetting.theme);
        });
    }
}
