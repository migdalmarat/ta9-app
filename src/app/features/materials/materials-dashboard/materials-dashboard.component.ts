import {
  Component,
  inject,
  model,
  NgModule,
  OnInit,
  signal,
} from '@angular/core';
import { MaterialListComponent } from '../materials-list/materials-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsDialogComponent } from '../materials-dialog/materials-dialog.component';
import { MaterialsStore } from '../materials.store';

@Component({
  selector: 'app-materials-dashboard',
  templateUrl: './materials-dashboard.component.html',
  styleUrls: ['./materials-dashboard.component.scss'],
  imports: [MaterialListComponent, MatButtonModule, MatIconModule],
})
export class MaterialsDashboardComponent implements OnInit {
  readonly store = inject(MaterialsStore);
  readonly dialog = inject(MatDialog);
  viewMode: 'list' | 'grid' = 'list';
  searchQuery: any;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      'add-new',
      this.sanitizer.bypassSecurityTrustResourceUrl('/svg/add-new.svg')
    );
    this.iconRegistry.addSvgIcon(
      'list-mode',
      this.sanitizer.bypassSecurityTrustResourceUrl('/svg/list-mode.svg')
    );
    this.iconRegistry.addSvgIcon(
      'tiles-mode',
      this.sanitizer.bypassSecurityTrustResourceUrl('/svg/tiles-mode.svg')
    );
  }

  ngOnInit() {}

  onSearch() {
    throw new Error('Method not implemented.');
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(MaterialsDialogComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.store.addItem(result);
      }
    });
  }
  setViewMode(arg0: string) {
    throw new Error('Method not implemented.');
  }
}
