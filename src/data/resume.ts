import resumeJson from './resume.json';

export interface Role {
  title: string;
  org: string;
  points: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year?: string;
  url?: string;
}

export interface ResumeData {
  profile: {
    name: string;
    role: string;
    graduation: string;
    year: string;
    gpa: string;
    seeking: string;
  };
  education: {
    school: string;
    degree: string;
    detail: string;
    gpa: string;
  };
  roles: Role[];
  skills: string[];
  coursework: string[];
  certifications: Certification[];
  currentlyLearning: string[];
}

/**
 * Bundled fallback — mirrors src/data/resume.json at build time. The live site
 * fetches the same file from GitHub raw (see useResume) so edits appear without
 * a manual code change; this copy renders if that fetch fails.
 */
export const defaultResume = resumeJson as ResumeData;
