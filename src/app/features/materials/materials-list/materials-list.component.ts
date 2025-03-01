import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MaterialsStore } from '../materials.store';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MaterialItem } from '../../../models/material-item';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsDialogComponent } from '../materials-dialog/materials-dialog.component';

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
})
export class MaterialListComponent implements OnInit, AfterViewInit {
  readonly store = inject(MaterialsStore);
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = [
    'color',
    'name',
    'createdDate',
    'lastUpdate',
    'createdBy',
  ];
  dataSource: MatTableDataSource<MaterialItem> =
    new MatTableDataSource<MaterialItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    if (this.store.items().length === 0) {
      this.store.loadItems();
    }

    effect(() => {
      this.dataSource.data = this.store.items();
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowClick(rowData: any) {
    const dialogRef = this.dialog.open(MaterialsDialogComponent, {
      data: rowData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.store.addItem(result);
      }
    });
  }
}
