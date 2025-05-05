// Course Player Types
export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  type: 'video' | 'quiz' | 'reading';
  videoUrl?: string;
  posterUrl?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  progress: number;
  modulesCompleted: number;
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'file';
  url: string;
  size?: string;
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  text: string;
  timestamp: string;
  replies?: Comment[];
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  user: {
    name: string;
    avatar: string;
  };
  score: number;
  completionTime: string;
}

export interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
}