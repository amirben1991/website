import { Component } from '@angular/core';
import { PageFooterComponent } from '../page-footer/page-footer.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [
    PageFooterComponent, 
    RouterModule, 
    NavbarComponent
  ],

  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

}
