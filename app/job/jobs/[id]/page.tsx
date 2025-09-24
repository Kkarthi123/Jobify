'use client';
import { useParams } from 'next/navigation';
import { useJobstore } from '@/store/jobStore';
import JobDetailCard from '@/components/JobDetailCard';
import { Ban } from 'lucide-react'
import { Role } from '@/types';


export default function JobDetail() {
  const { id } = useParams();
  const jobs = useJobstore((state) => state.jobs);
  const job = jobs.find((j) => j.id === id);
  const role = useJobstore((state) => state.user?.role);

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Ban className="w-16 h-16 text-gray-400 mb-4" />
        <span className="text-2xl font-semibold text-gray-500 mb-2">Job not found</span>
        <p className="text-gray-400">The job you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-4">
      <JobDetailCard job={{ ...job, isShowApplyButton: role === Role.User }} />
    </div>
  );
}