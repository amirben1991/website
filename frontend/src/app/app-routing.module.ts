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
  { path: 'login', component: LoginComponent, data: { titleKey: 'AUTH.LOGIN_TITLE' } },
  { path: 'register', component: RegisterComponent, data: { titleKey: 'AUTH.REGISTER_TITLE' } },
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
      { path: 'accueil', component: PrincipalContentComponent, data: { titleKey: 'NAV.HOME' } },
      { path: 'projects/new', component: ProjectFormComponent, canActivate: [AuthGuard], data: { titleKey: 'PROJECTS.ADD' } },
      { path: 'projects/:id/edit', component: ProjectFormComponent, canActivate: [AuthGuard], data: { titleKey: 'PROJECTS.EDIT' } },
      { path: 'projects', component: ProjectsContentComponent, data: { titleKey: 'NAV.PROJECTS' } },
      { path: 'experience/new', component: ExperienceFormComponent, canActivate: [AuthGuard], data: { titleKey: 'EXPERIENCE.ADD' } },
      { path: 'experience/:id/edit', component: ExperienceFormComponent, canActivate: [AuthGuard], data: { titleKey: 'EXPERIENCE.EDIT' } },
      { path: 'experience', component: ExperienceContentComponent, data: { titleKey: 'NAV.EXPERIENCE' } },
      { path: 'education/new', component: EducationFormComponent, canActivate: [AuthGuard], data: { titleKey: 'EDUCATION.ADD' } },
      { path: 'education/:id/edit', component: EducationFormComponent, canActivate: [AuthGuard], data: { titleKey: 'EDUCATION.EDIT' } },
      { path: 'education', component: EducationContentComponent, data: { titleKey: 'NAV.EDUCATION' } },
      { path: 'admin/users', component: AdminUsersComponent, canActivate: [AdminGuard], data: { titleKey: 'NAV.ADMIN' } },
      { path: 'coursera', loadComponent: () => import('./components/coursera-certifications/coursera-certifications.component').then(m => m.CourseraCertificationsComponent), data: { titleKey: 'HOME.CARD_COURSERA_DESC' } },
      { path: 'udemy', loadComponent: () => import('./components/udemy-certifications/udemy-certifications.component').then(m => m.UdemyCertificationsComponent), data: { titleKey: 'HOME.CARD_UDEMY_DESC' } }
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


