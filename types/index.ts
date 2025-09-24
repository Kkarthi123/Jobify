export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  employment_type: string;
  qualifications: string[] | string;
  created_at: string;
};

export type AppUser = {
  userId: string;
  email: string | null;
  role?: Role | undefined;
}

export type AuthData = {
  email: string;
  password: string;
  role?: Role;
}

export enum Role {
  Recruiter = 'recruiter',
  User = 'user'
}



export interface JobState {
  jobs: Job[];
  isPending: boolean;
  isError: boolean;
  addJob: (job: Job) => void;
  setJobs: (jobs: Job[]) => void;
  setPending: (isPending: boolean) => void;
  setError: (isError: boolean) => void;

  user: AppUser | null;
  setUser: (user: AppUser | null) => void;
  logout: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export interface JobCardProps {
  job: Job;
}