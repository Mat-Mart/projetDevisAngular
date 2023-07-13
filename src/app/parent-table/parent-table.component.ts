import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  ouvert: boolean;
}

@Component({
  selector: 'parent-table',
  templateUrl: './parent-table.component.html',
  styleUrls: ['./parent-table.component.css']
})
export class ParentTableComponent {
  @Input() groupe!: Groupe;
  @Input() rootGroup: Groupe | undefined;
  @Output() supprimerGroupeEvent: EventEmitter<Groupe> = new EventEmitter<Groupe>();

  showTableauSupplementaire: boolean = false;

  // Calculer le total du groupe
  calculateGroupeTotal(): number {
    let total = 0;
    for (const enfant of this.groupe.enfants) {
      total += enfant.total || 0;
    }
    for (const ligne of this.groupe.lignes) {
      total += ligne.totalLigne || 0;
    }
    const groupeTotal = total * this.groupe.quantite; // Multiplication de la quantité du groupe
    this.groupe.total = +groupeTotal.toFixed(2); // Formater le résultat avec deux décimales
    return this.groupe.total;
  }

  // Calculer le total de la ligne
  calculateLigneTotal(ligne: Ligne): number {
    const totalLigne = ligne.quantite * ligne.prix;
    ligne.totalLigne = +totalLigne.toFixed(2); // Formater le résultat avec deux décimales
    this.calculateGroupeTotal();
    return ligne.totalLigne;
  }

  // Calculer le total HT du groupe
  calculateTotalHT(): number {
    let totalHT = 0;
    for (const enfant of this.groupe.enfants) {
      totalHT += enfant.total || 0;
    }
    for (const ligne of this.groupe.lignes) {
      totalHT += ligne.totalLigne || 0;
    }
    const groupeTotalHT = totalHT * this.groupe.quantite; // Multiplication de la quantité du groupe
    return +groupeTotalHT.toFixed(2); // Formater le résultat avec deux décimales
  }

  // Ajouter un groupe
  ajouterGroupe(): void {
    if (!this.rootGroup) {
      this.rootGroup = {
        designation: '',
        quantite: 0,
        unite: '',
        prix: 0,
        lignes: [],
        enfants: [],
        total: 0,
        ouvert: true
      };
      this.showTableauSupplementaire = true;
      this.groupe = this.rootGroup;

    } else {
      this.groupe.enfants.push({
        designation: '',
        quantite: 0,
        unite: '',
        prix: 0,
        lignes: [],
        enfants: [],
        total: 0,
        ouvert: true
      });
    }
    this.calculateGroupeTotal();
  }

  // Ajouter une ligne
  ajouterLigne(): void {
    this.groupe.lignes.push({
      designation: '',
      quantite: 0,
      unite: '',
      prix: 0
    });
    this.calculateGroupeTotal();
  }

  // Supprimer une ligne
  supprimerLigne(ligne: Ligne): void {
    const index = this.groupe.lignes.indexOf(ligne);
    if (index !== -1) {
      this.groupe.lignes.splice(index, 1);
      this.calculateGroupeTotal();
    }
  }

  // Supprimer un groupe
  supprimerGroupe(groupe: Groupe): void {
    const index = this.groupe.enfants.indexOf(groupe);
    if (index !== -1) {
      this.groupe.enfants.splice(index, 1);
      this.calculateGroupeTotal();
    }
  }
}
