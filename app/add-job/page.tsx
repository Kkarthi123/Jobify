'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useJobstore } from '@/store/jobStore';
import JobForm from '@/components/JobForm';

export default function AddJob() {
    return <JobForm />;
}