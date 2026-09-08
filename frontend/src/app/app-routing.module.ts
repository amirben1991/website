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
  { path: 'login', component: LoginComponent, title: 'Connexion | PrinceDev' },
  { path: 'register', component: RegisterComponent, title: 'Inscription | PrinceDev' },
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
      { path: 'accueil', component: PrincipalContentComponent, title: 'PrinceDev' },
      { path: 'projects/new', component: ProjectFormComponent, canActivate: [AuthGuard], title: 'Nouveau projet | PrinceDev' },
      { path: 'projects/:id/edit', component: ProjectFormComponent, canActivate: [AuthGuard], title: 'Modifier projet | PrinceDev' },
      { path: 'projects', component: ProjectsContentComponent, title: 'Projets | PrinceDev' },
      { path: 'experience/new', component: ExperienceFormComponent, canActivate: [AuthGuard], title: 'Nouvelle expérience | PrinceDev' },
      { path: 'experience/:id/edit', component: ExperienceFormComponent, canActivate: [AuthGuard], title: 'Modifier expérience | PrinceDev' },
      { path: 'experience', component: ExperienceContentComponent, title: 'Expérience | PrinceDev' },
      { path: 'education/new', component: EducationFormComponent, canActivate: [AuthGuard], title: 'Nouvelle formation | PrinceDev' },
      { path: 'education/:id/edit', component: EducationFormComponent, canActivate: [AuthGuard], title: 'Modifier formation | PrinceDev' },
      { path: 'education', component: EducationContentComponent, title: 'Formation | PrinceDev' },
      { path: 'admin/users', component: AdminUsersComponent, canActivate: [AdminGuard], title: 'Administration | PrinceDev' },
      { path: 'coursera', loadComponent: () => import('./components/coursera-certifications/coursera-certifications.component').then(m => m.CourseraCertificationsComponent), title: 'Coursera | PrinceDev' },
      { path: 'udemy', loadComponent: () => import('./components/udemy-certifications/udemy-certifications.component').then(m => m.UdemyCertificationsComponent), title: 'Udemy | PrinceDev' }
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


