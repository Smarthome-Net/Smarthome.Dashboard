import { FilterService } from './filter-service';
import { FilterServiceImpl } from './filter.service';

export * from './filter-service';
export const FilterServiceProvider =  { provide: FilterService, useClass: FilterServiceImpl };
