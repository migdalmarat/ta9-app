import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/materials', pathMatch: 'full' },
  {
    path: 'materials',
    loadChildren: () =>
      import('./features/materials/materials.routes').then(
        (m) => m.MATERIALS_ROUTES
      ),
  },
];
