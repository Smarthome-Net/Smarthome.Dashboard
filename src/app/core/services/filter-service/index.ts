import { Provider } from '@angular/core';
import { FilterService } from './filter-service';
import { FilterServiceImpl } from './filter.service';

export * from './filter-service';
export function provideFilterService(): Provider {
    return {
        provide: FilterService, useClass: FilterServiceImpl
    }
}
