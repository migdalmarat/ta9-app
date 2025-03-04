import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MaterialsStore } from '../materials.store';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MaterialsDialogComponent } from '../materials-dialog/materials-dialog.component';

@Component({
  selector: 'app-materials-grid',
  templateUrl: './materials-grid.component.html',
  styleUrls: ['./materials-grid.component.scss'],
  imports: [MatCardModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsGridComponent {
  readonly store = inject(MaterialsStore);
  readonly dialog = inject(MatDialog);
  constructor() {
    if (this.store.items().length === 0) {
      this.store.loadItems();
    }
  }

  selectCard(item: any): void {
    const dialogRef = this.dialog.open(MaterialsDialogComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.store.addItem(result);
      }
    });
  }
}
