import { Component } from '@angular/core';

// Interface pour une ligne
interface Ligne {
  designation: string;
  quantite: number;
  unite: string;
  prix: number;
  totalLigne?: number;
}

// Interface pour un groupe
interface Groupe {
  designation: string;
  quantite: number;
  unite: string;
  prix: number;
  lignes: Ligne[];
  enfants: Groupe[];
  total?: number;
  isCollapsed: boolean;
}

// Définition du composant principal AppComponent
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Propriété groupe représentant le groupe racine
  groupe: Groupe = {
    designation: '',
    quantite: 0,
    unite: '',
    prix: 0,
    lignes: [],
    enfants: [],
    total: 0,
    isCollapsed: false
  };
}
