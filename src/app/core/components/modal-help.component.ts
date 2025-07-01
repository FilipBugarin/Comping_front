import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'modal-help',
  standalone: true,
  template: `
    <div
      class="modal md:w-96"
      *transloco="let t; read: 'help'">
      <div class="modal-head">
        <h2 class="text-xl font-medium">{{ t(data) }}</h2>
        <button (click)="dialogRef.close()">
          <span class="material-symbols-outlined"> close </span>
        </button>
      </div>
      <div class="modal-body mat-typography">
        <div [innerHTML]="content$ | async"></div>
      </div>
    </div>
  `,
  styles: [``],
  imports: [AsyncPipe, TranslocoModule],
})
export class ModalHelpComponent implements OnInit {
  content$!: Observable<SafeHtml>;

  httpClient = inject(HttpClient);
  sanitizer = inject(DomSanitizer);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<ModalHelpComponent>
  ) {}

  ngOnInit(): void {
    const path = 'assets/help/' + this.data + '.html';
    this.content$ = this.httpClient
      .get(path, { responseType: 'text' })
      .pipe(map((data) => this.sanitizer.bypassSecurityTrustHtml(data)));
  }
}
