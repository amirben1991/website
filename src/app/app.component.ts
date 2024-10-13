import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageHeadComponent } from './page-head/page-head.component';
import { PrincipalContentComponent } from './principal-content/principal-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PageHeadComponent, PrincipalContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'structure';
}
