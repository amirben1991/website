import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EducationContentComponent } from './principal-content/education-content/education-content.component';
import { ExperienceContentComponent } from "./principal-content/experience-content/experience-content.component";
import { ProjectsContentComponent } from "./principal-content/projects-content/projects-content.component";
import { LayoutComponent } from './layout/layout.component';
import { PrincipalContentComponent } from './principal-content/principal-content.component';

const routes: Routes = [

  {
    path: '', component: LayoutComponent, children: [
      {path: '', component: PrincipalContentComponent},
      {path: 'education', component: EducationContentComponent},
      {path: 'experience', component: ExperienceContentComponent},
      {path: 'projects', component: ProjectsContentComponent}
    ]
  },
];


@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})

export class AppRoutingModule { }


