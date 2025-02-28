import { Component, NgModule, OnInit } from '@angular/core';
import { MaterialListComponent } from '../materials-list/materials-list.component';

@Component({
  selector: 'app-materials-dashboard',
  templateUrl: './materials-dashboard.component.html',
  styleUrls: ['./materials-dashboard.component.scss'],
  imports: [MaterialListComponent],
})
export class MaterialsDashboardComponent implements OnInit {
  viewMode: 'list' | 'grid' = 'list';

  searchQuery: any;
  constructor() {}

  ngOnInit() {}

  onSearch() {
    throw new Error('Method not implemented.');
  }

  openCreateModal() {
    throw new Error('Method not implemented.');
  }
  setViewMode(arg0: string) {
    throw new Error('Method not implemented.');
  }
}
