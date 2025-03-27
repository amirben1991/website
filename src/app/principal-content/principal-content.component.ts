import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-principal-content',
    imports: [PrincipalContentComponent, RouterModule],
    templateUrl: './principal-content.component.html',
    styleUrl: './principal-content.component.scss'
})
export class PrincipalContentComponent {
  constructor(private router: Router) {}

  goToEducation() {
    this.router.navigate(['/principal/education']);
  }
}
