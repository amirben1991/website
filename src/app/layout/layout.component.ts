import { Component } from '@angular/core';
import { PageHeadComponent } from '../page-head/page-head.component';
import { PageFooterComponent } from '../page-footer/page-footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [PageHeadComponent, PageFooterComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

}
