import { Component } from '@angular/core';
import { PageFooterComponent } from '../page-footer/page-footer.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ChatWidgetComponent } from '../components/chat-widget/chat-widget.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [
    PageFooterComponent, 
    RouterModule, 
    NavbarComponent,
    ChatWidgetComponent
  ],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
