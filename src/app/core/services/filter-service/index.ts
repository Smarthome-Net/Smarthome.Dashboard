import { Provider } from '@angular/core';
import { FilterService } from './filter-service';
import { FilterServiceImpl } from './filter.service';

export * from './filter-service';
export const FilterServiceProvider: Provider =  { provide: FilterService, useClass: FilterServiceImpl };
