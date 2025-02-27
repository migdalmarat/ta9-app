import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MaterialsService } from '../../../services/materials.service';
import { MaterialItem } from '../../../models/material-item';
import { MaterialsStore } from '../materials.store';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialListComponent implements OnInit {
  readonly store = inject(MaterialsStore);
  private itemService = inject(MaterialsService);

  items: MaterialItem[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.store.loadItems();
  }
}
