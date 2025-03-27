import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { PageHeadComponent } from './page-head/page-head.component';
import { PrincipalContentComponent } from './principal-content/principal-content.component';
import { ExperienceContentComponent } from './principal-content/experience-content/experience-content.component';
import { EducationContentComponent } from './principal-content/education-content/education-content.component';
import { ProjectsContentComponent } from './principal-content/projects-content/projects-content.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [PageHeadComponent,
        PrincipalContentComponent,
        PageFooterComponent,
        ExperienceContentComponent,
        EducationContentComponent,
        ProjectsContentComponent,
        NgOptimizedImage, RouterLink, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'structure';
}
