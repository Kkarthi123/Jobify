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

export interface JobState {
  jobs: Job[];
  isPending: boolean;
  isError: boolean;
  addJob: (job: Job) => void;
  setJobs: (jobs: Job[]) => void;
  setPending: (isPending: boolean) => void;
  setError: (isError: boolean) => void;
}

export interface JobCardProps {
  job: Job;
}