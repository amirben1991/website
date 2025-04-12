import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EducationContentComponent } from './principal-content/education-content/education-content.component';
import { ExperienceContentComponent } from "./principal-content/experience-content/experience-content.component";
import { ProjectsContentComponent } from "./principal-content/projects-content/projects-content.component";

const routes: Routes = [

  {path:'education', component: EducationContentComponent},
  {path:'experience', component: ExperienceContentComponent},
  {path:'projectd', component: ProjectsContentComponent},
  {path:'', redirectTo:'/home', pathMatch: 'full'},

];


@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})

export class AppRoutingModule { }


