import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';  // Ajoutez cette ligne

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule  // Ajoutez cette ligne pour inclure le module de routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
