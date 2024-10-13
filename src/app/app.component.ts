import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageHeadComponent } from './page-head/page-head.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PageHeadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'structure';
}
