import { Injectable } from '@angular/core';
import { MatPaginatorDefaultOptions, MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

export const matPaginatorOptions: MatPaginatorDefaultOptions = {
  formFieldAppearance: 'fill',
};

@Injectable()
export class GermanPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = 'Erste Seite';
  itemsPerPageLabel = 'Werte pro Seite:';
  lastPageLabel = 'Letzte Seite';
  nextPageLabel = 'Nächste Seite';
  previousPageLabel = 'Vorherige Seite';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return 'Seite 1 von 1';
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Seite ${page + 1} von ${amountPages}`;
  }
}
