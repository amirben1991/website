import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EducationContentComponent } from './principal-content/education-content/education-content.component';
import { ExperienceContentComponent } from "./principal-content/experience-content/experience-content.component";
import { ProjectsContentComponent } from "./principal-content/projects-content/projects-content.component";
import { PrincipalContentComponent } from './principal-content/principal-content.component';

const routes: Routes = [

  {
    path:'principal',
    component: PrincipalContentComponent,
    children: [
      {path: 'Education-component', component: EducationContentComponent},
      {path: 'Experience-component', component: ExperienceContentComponent},
      {path: 'Projects-component', component: ProjectsContentComponent}
    ]
  }

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
