import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageHeadComponent } from './page-head/page-head.component';
import { PrincipalContentComponent } from './principal-content/principal-content.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PageHeadComponent, PrincipalContentComponent, PageFooterComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'structure';
}
