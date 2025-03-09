import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { AppRoutingModule } from './app-routing.module';  // Ajoutez cette ligne
import {EducationContentComponent} from "../principal-content/education-content/education-content.component";
import {ExperienceContentComponent} from "../principal-content/experience-content/experience-content.component";
import {ProjectsContentComponent} from "../principal-content/projects-content/projects-content.component";


@NgModule({
  declarations: [
    AppComponent,
    EducationContentComponent,
    ExperienceContentComponent,
    ProjectsContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule  // Ajoutez cette ligne pour inclure le module de routing
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

