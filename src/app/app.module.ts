import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { AppRoutingModule } from './app-routing.module';
import {EducationContentComponent} from "../principal-content/education-content/education-content.component";
import {ExperienceContentComponent} from "../principal-content/experience-content/experience-content.component";
import {ProjectsContentComponent} from "../principal-content/projects-content/projects-content.component";
import { PageHeadComponent } from './page-head/page-head.component';

@NgModule({
  declarations: [
    AppComponent,
    EducationContentComponent,
    ExperienceContentComponent,
    ProjectsContentComponent,
    PageHeadComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

