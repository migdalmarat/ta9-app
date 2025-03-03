import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { MaterialListComponent } from '../materials-list/materials-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsDialogComponent } from '../materials-dialog/materials-dialog.component';
import { MaterialsStore } from '../materials.store';
import { MaterialsGridComponent } from '../materials-grid/materials-grid.component';
import { IconService } from '../../../services/icon.service';

@Component({
  selector: 'app-materials-dashboard',
  templateUrl: './materials-dashboard.component.html',
  styleUrls: ['./materials-dashboard.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MaterialListComponent,
    MaterialsGridComponent,
    MatButtonModule,
    MatIconModule,
  ],
})
export class MaterialsDashboardComponent {
  readonly store = inject(MaterialsStore);
  readonly dialog = inject(MatDialog);
  readonly iconsService = inject(IconService);
  viewMode: 'list' | 'grid' = 'list';
  searchQuery: any;


  openCreateModal() {
    const dialogRef = this.dialog.open(MaterialsDialogComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.store.addItem(result);
      }
    });
  }

  setViewMode(view: string) {
    this.viewMode = view as 'list' | 'grid';
  }
}
