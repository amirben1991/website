import { Component, NgZone } from '@angular/core';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import { PrincipalContentComponent } from './principal-content/principal-content.component';
import { ExperienceContentComponent } from './principal-content/experience-content/experience-content.component';
import { EducationContentComponent } from './principal-content/education-content/education-content.component';
import { ProjectsContentComponent } from './principal-content/projects-content/projects-content.component';
import { NgOptimizedImage } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
      PrincipalContentComponent,
      LayoutComponent,
      ExperienceContentComponent,
      EducationContentComponent,
      ProjectsContentComponent,
      RouterModule
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {

}
