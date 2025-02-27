import { Component } from '@angular/core';
import { MaterialListComponent } from './features/materials/material-list/material-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MaterialListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ta9-app';
}
