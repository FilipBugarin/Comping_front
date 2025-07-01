import { MatPaginatorIntl } from '@angular/material/paginator';

const hrRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) {
    return `0 od ${length}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} od ${length}`;
};

export function getHrPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Stavki po stranici:';
  paginatorIntl.nextPageLabel = 'Sljedeća stranica';
  paginatorIntl.previousPageLabel = 'Prethodna stranica';
  paginatorIntl.getRangeLabel = hrRangeLabel;

  return paginatorIntl;
}
