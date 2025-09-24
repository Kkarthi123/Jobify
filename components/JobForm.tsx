'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useJobstore } from '@/store/jobStore';

export default function JobForm({}){
    const addJob = useJobstore((state) => state.addJob);
    const router = useRouter();

    const [form, setForm] = useState({
        title: '',
        company: '',
        location: '',
        employment_type: '',
        description: '',
        qualifications: [],
        created_at: new Date().toDateString() 
    });

    const [errors, setErrors] = useState<Partial<typeof form>>({});

    const validate = () => {
        const newErrors: Partial<typeof form> = {};
        if (!form.title.trim()) newErrors.title = 'Title is required';
        if (!form.company.trim()) newErrors.company = 'Company is required';
        if (!form.location.trim()) newErrors.location = 'Location is required';
        if (!form.employment_type.trim()) newErrors.employment_type = 'Job type is required';
        if (!form.description.trim()) newErrors.description = 'Description is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const newJob = { 
            id: uuidv4(), 
            ...form, 
        };
        try {
            addJob(newJob);
            router.push('/job/jobs');
        } catch (error) {
            console.error('Error submitting job:', error);
        }
    };

    return (
    <main className='max-w-2xl mx-auto bg-white rounded-lg shadow-lg m-5'>
        {/* Banner with elegant pattern and icons */}
        <div className="relative bg-gradient-to-br from-[#233364ed] via-[#233364] to-gray-900 rounded-lg shadow-md mb-4 overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
                {/* Decorative SVG pattern */}
                <svg width="100%" height="100%" viewBox="0 0 400 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="30" fill="#fff" />
                    <circle cx="120" cy="40" r="20" fill="#fff" />
                    <circle cx="200" cy="40" r="35" fill="#fff" />
                    <circle cx="300" cy="40" r="25" fill="#fff" />
                    <circle cx="370" cy="40" r="15" fill="#fff" />
                </svg>
            </div>
            <div className="relative z-10 flex items-center gap-4 px-8 py-8">
                {/* Example icons using Heroicons (or swap with your preferred icon library) */}
                <span className="inline-flex items-center justify-center bg-white bg-opacity-80 rounded-full p-3 shadow-lg ">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zm0 0c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm0 0v8" />
                    </svg>
                </span>
                <div>
                    <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">Post a New Job</h1>
                    <p className="text-lg text-white/90 mt-1">Share your opportunity with top talent. Fill out the form below to get started!</p>
                </div>
            </div>
        </div>
        <div className="p-6 ">
            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Add job form">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title <span className="text-red-500">*</span>
                </label>
                <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. Frontend Developer"
                onChange={handleChange}
                value={form.title}
                className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900`}
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? "title-error" : undefined}
                autoComplete="off"
                />
                {errors.title && (
                <p id="title-error" className="text-red-600 text-xs mt-1" role="alert">
                    {errors.title}
                </p>
                )}
            </div>
            <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company <span className="text-red-500">*</span>
                </label>
                <input
                id="company"
                name="company"
                type="text"
                placeholder="e.g. Acme Corp"
                onChange={handleChange}
                value={form.company}
                className={`w-full p-3 border ${errors.company ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900`}
                aria-invalid={!!errors.company}
                aria-describedby={errors.company ? "company-error" : undefined}
                autoComplete="off"
                />
                {errors.company && (
                <p id="company-error" className="text-red-600 text-xs mt-1" role="alert">
                    {errors.company}
                </p>
                )}
            </div>
            <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
                </label>
                <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Remote or New York, NY"
                onChange={handleChange}
                value={form.location}
                className={`w-full p-3 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900`}
                aria-invalid={!!errors.location}
                aria-describedby={errors.location ? "location-error" : undefined}
                autoComplete="off"
                />
                {errors.location && (
                <p id="location-error" className="text-red-600 text-xs mt-1" role="alert">
                    {errors.location}
                </p>
                )}
            </div>
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Job Type <span className="text-red-500">*</span>
                </label>
                <select
                id="type"
                name="employment_type"
                onChange={handleChange}
                value={form.employment_type}
                className={`w-full p-3 border ${errors.employment_type ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900`}
                aria-invalid={!!errors.employment_type}
                aria-describedby={errors.employment_type ? "type-error" : undefined}
                >
                <option value="">Select job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Temporary">Temporary</option>
                </select>
                {errors.employment_type && (
                <p id="type-error" className="text-red-600 text-xs mt-1" role="alert">
                    {errors.employment_type}
                </p>
                )}
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
                </label>
                <textarea
                id="description"
                name="description"
                placeholder="Describe the job responsibilities, requirements, etc."
                onChange={handleChange}
                value={form.description}
                className={`w-full p-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900`}
                rows={5}
                aria-invalid={!!errors.description}
                aria-describedby={errors.description ? "description-error" : undefined}
                />
                {errors.description && (
                <p id="description-error" className="text-red-600 text-xs mt-1" role="alert">
                    {errors.description}
                </p>
                )}
            </div>
            <div className="flex justify-end">
                <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold px-6 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                Submit
                </button>
            </div>
            </form>
        </div>
    </main>
    );
}