import { Component, NgZone } from '@angular/core';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
      RouterOutlet,
      LayoutComponent,
      RouterModule,
      NavbarComponent
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {

}
