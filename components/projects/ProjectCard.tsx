// Shared project types. The old card UI was replaced by ProjectManifestRow.
export interface ProjectLink {
  url: string;
  type: 'github' | 'website' | 'other';
  label: string; 
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string; // Standard link
  links?: ProjectLink[]; // Multiple custom links
  highlight?: boolean;
  gallery?: string[];
  extendingImages?: string[]; // Images that "pop out" of the card
  longDescription?: string;
  features?: string[];
  achievements?: string;
}
