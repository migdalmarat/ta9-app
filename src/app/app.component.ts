import { Component } from '@angular/core';
import { MaterialListComponent } from './features/materials/materials-list/materials-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ta9-app';
}
