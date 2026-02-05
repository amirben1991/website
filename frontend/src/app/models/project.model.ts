export interface Project {
  id: string; // Identifiant unique du projet
  title: string; // Titre du projet
  description: string; // Description du projet
  imageUrl?: string; // URL de l'image (optionnel)
  githubLink?: string; // Lien vers le dépôt GitHub (optionnel)
  liveUrl?: string; // Lien vers la démo en ligne (optionnel)
  techStack?: string; // Technologies utilisées (séparées par des virgules)
  featured?: boolean; // Indique si le projet est mis en avant
}