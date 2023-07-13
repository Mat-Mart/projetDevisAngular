// Importation du module NgModule depuis @angular/core
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentTableComponent } from './parent-table/parent-table.component';

// Déclaration du module principal AppModule
@NgModule({
  declarations: [
    // Déclaration des composants utilisés dans le module
    AppComponent,
    ParentTableComponent
  ],
  imports: [
    // Importation des modules requis pour le fonctionnement de l'application
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
