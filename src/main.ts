import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';  // Important : ajout du routage ici
import { routes } from './app/app-routing.module';  // On récupère les routes depuis ton module de routage

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Fournir le routage ici
    ...appConfig.providers,  // Assurer que appConfig est bien inclus
  ]
})
.catch(err => console.error(err));
