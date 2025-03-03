import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MaterialsStore } from '../materials.store';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MaterialsDialogComponent } from '../materials-dialog/materials-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialItem } from '../../../models/material-item';

@Component({
  selector: 'app-materials-grid',
  templateUrl: './materials-grid.component.html',
  styleUrls: ['./materials-grid.component.scss'],
  imports: [MatCardModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsGridComponent implements OnInit{
  readonly store = inject(MaterialsStore);
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    if (this.store.items().length === 0) {
      this.store.loadItems();
    }
  }

  selectCard(item: MaterialItem): void {
    const dialogRef = this.dialog.open(MaterialsDialogComponent, {
      data: item,
    });
  }
}
