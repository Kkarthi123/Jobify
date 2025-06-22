import { create } from 'zustand';
import { Job, JobState } from '@/types';

// Zustand store for managing job data
export const useJobstore = create<JobState>((set)=>({
    jobs: [],
    isPending: true,
    isError: false,
    addJob: (job: Job) => set((state) => ({ jobs: [job, ...state.jobs] })),
    setJobs: (jobs: Job[]) => set({ jobs }),
    setPending: (isPending: boolean) => set({ isPending }),
    setError: (isError: boolean) => set({ isError })
}))