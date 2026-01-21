import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducationContentComponent } from './principal-content/education-content/education-content.component';
import { ExperienceFormComponent } from "./principal-content/experience-content/experience-content.component";
import { ProjectsContentComponent } from "./principal-content/projects-content/projects-content.component";
import { LayoutComponent } from './layout/layout.component';
import { PrincipalContentComponent } from './principal-content/principal-content.component';
import { ProjectFormComponent } from './principal-content/project-form/project-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '', component: LayoutComponent, 
    children: [
      {path: '', redirectTo: 'accueil', pathMatch: 'full'},
      {path: 'accueil', component: PrincipalContentComponent},
      {path: 'education', component: EducationContentComponent},
      {path: 'experience', component: ExperienceFormComponent},
      {path: 'projects', component: ProjectsContentComponent},
      { path: 'projects/new', component: ProjectFormComponent, canActivate: [AuthGuard] },
      { path: 'projects/:id/edit', component: ProjectFormComponent, canActivate: [AuthGuard] }
    ]
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})

export class AppRoutingModule { }


