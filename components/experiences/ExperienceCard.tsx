// Shared experience types. The old card UI was replaced by ExperienceManifestRow.
export interface ExperienceLink {
  url: string;
  type: 'github' | 'website' | 'other';
  label: string; 
}

export interface ExperienceSection {
  title: string;
  body: string;
  images?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  dates: string;
  description?: string;
  longDescription?: string;
  badge: string;
  thumbnail?: string;
  extendingImages?: string[];
  bullets: string[];
  sections?: ExperienceSection[];
  gallery?: string[];
  skills?: string[];
  links?: ExperienceLink[];
  location?: string;
}
