'use client';
import { useEffect } from 'react';
import { useJobstore } from '@/store/jobStore';

export default function JobLayout({ children }: { children: React.ReactNode }) {
    const {setJobs, setPending, setError, jobs} = useJobstore();
  
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setPending(true);
                const res = await fetch('https://jsonfakery.com/jobs');
                const data = await res.json();
                if (data) {
                    setJobs(data);
                }
            } catch (err) {
                console.error('Failed to load jobs:', err);
                setError(true);
            } finally {
                setPending(false);
            }
        };

        if (jobs.length === 0) {
            fetchJobs();
        }
    }, [jobs.length]);

  return <>{children}</>;
}