import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducationContentComponent } from './principal-content/education-content/education-content.component';
import { ExperienceContentComponent } from "./principal-content/experience-content/experience-content.component";
import { ExperienceFormComponent } from "./principal-content/experience-form/experience-form.component";
import { ProjectsContentComponent } from "./principal-content/projects-content/projects-content.component";
import { LayoutComponent } from './layout/layout.component';
import { PrincipalContentComponent } from './principal-content/principal-content.component';
import { ProjectFormComponent } from './principal-content/project-form/project-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { EducationFormComponent } from './principal-content/education-form/education-form.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';



export const routes: Routes = [
  { path: 'login', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'register', redirectTo: 'accueil', pathMatch: 'full' },
  {
    path: '', component: LayoutComponent, 
    children: [
      {path: '', redirectTo: 'accueil', pathMatch: 'full'},
      {path: 'accueil', component: PrincipalContentComponent},
      {path: 'projects/new', component: ProjectFormComponent, canActivate: [AuthGuard] },
      {path: 'projects/:id/edit', component: ProjectFormComponent, canActivate: [AuthGuard]},
      {path: 'projects', component: ProjectsContentComponent},
      {path: 'experience/new', component: ExperienceFormComponent, canActivate: [AuthGuard]},
      {path: 'experience/:id/edit', component: ExperienceFormComponent, canActivate: [AuthGuard]},
      {path: 'experience', component: ExperienceContentComponent},
      {path: 'education/new', component: EducationFormComponent, canActivate: [AuthGuard]},
      {path: 'education/:id/edit', component: EducationFormComponent, canActivate: [AuthGuard]},
      {path: 'education', component: EducationContentComponent},
      {path: 'admin/users', component: AdminUsersComponent, canActivate: [AdminGuard]}
  ,{path: 'coursera', loadComponent: () => import('./components/coursera-certifications/coursera-certifications.component').then(m => m.CourseraCertificationsComponent)}
  ,{path: 'udemy', loadComponent: () => import('./components/udemy-certifications/udemy-certifications.component').then(m => m.UdemyCertificationsComponent)}
  ,{path: 'articles', loadComponent: () => import('./components/articles/articles.component').then(m => m.ArticlesComponent)}
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


