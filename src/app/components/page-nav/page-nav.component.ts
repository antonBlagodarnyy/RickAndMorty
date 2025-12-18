import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-page-nav',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
  ],
  template: ` <div class="container-page-nav">
    <mat-form-field class="page-selector" appearance="outline">
      <mat-select [value]=" pageIndex()" (selectionChange)="onPageChange($event.value)">
        @for(p of pages(); track $index){
        <mat-option [value]="p"> Page {{ p + 1 }} </mat-option>
        }
      </mat-select>
    </mat-form-field>
    <mat-paginator
      [length]="totalCharacters()"
      [pageSize]="20"
      [pageIndex]="pageIndex()"
      aria-label="Select page"
      (page)="onPageChange($event.pageIndex)"
      showFirstLastButtons="true"
    >
    </mat-paginator>
  </div>`,
})
export class PageNavComponent {
  pageIndex = input.required<number>();
  pages = input.required<number[]>();
  totalCharacters = input.required<number>();

  pageChangeEvent = output<number>();

  onPageChange(newPageIndex: number) {
    this.pageChangeEvent.emit(newPageIndex);
  }
}
