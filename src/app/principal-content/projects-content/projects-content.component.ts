import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-projects-content',
    imports: [RouterModule],
    templateUrl: './projects-content.component.html',
    styleUrl: './projects-content.component.scss'
})
export class ProjectsContentComponent {
    constructor(private router: Router) {};

    goToProjects() {
    this.router.navigate(['/principal/projects']);
  }

}
