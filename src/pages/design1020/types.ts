export const AppId = {
  PORTFOLIO: 'portfolio',
  NOTEPAD: 'notepad',
  BIO: 'bio',
  PHOTOS: 'photos',
  TRASH: 'trash'
} as const;

export type AppId = typeof AppId[keyof typeof AppId];

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  sourceUrl: string;
  tags: string[];
  date: string;
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
}