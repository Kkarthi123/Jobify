import { JobCardProps } from "../types";
import { Check, Briefcase, Clock, DollarSign, FileText, Sparkles, Send } from 'lucide-react';

export default function JobDetailCard({ job }: JobCardProps) {
    return(
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-xl flex flex-col gap-6">
            <div className="flex items-center gap-4">
            <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&size=80&background=random`}
            alt={`${job.company} logo`}
            className="w-16 h-16 rounded-lg object-cover bg-gray-100 border"
            />
            <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                {job.title}
                <span className="inline-block text-green-600">
                <Check className="h-6 w-6" />
                </span>
            </h1>
            <p className="text-gray-600">{job.company} &mdash; {job.location}</p>
            </div>
            </div>
            <div className="flex items-center gap-4 text-gray-500 text-sm">
            <span className="flex items-center gap-1">
            <Briefcase className="w-5 h-5 text-blue-500" />
            {job.employment_type || 'Full Time'}
            </span>
            <span className="flex items-center gap-1">
            <Clock className="w-5 h-5 text-yellow-500" />
            Posted {job.created_at || 'recently'}
            </span>
            <span className="flex items-center gap-1">
            <DollarSign className="w-5 h-5 text-green-500" />
            {'Salary not disclosed'}
            </span>
            </div>
            <section>
            <h2 className="text-xl font-semibold mb-2 text-gray-800 flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-500" />
            Job Description
            </h2>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
            </section>
            {job.qualifications && job.qualifications.length > 0 && (
            <section>
            <h3 className="text-lg font-semibold mb-1 text-gray-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                Required Skills
            </h3>
            <ul className="flex flex-wrap gap-2 mt-2">
                {(Array.isArray(job.qualifications)
                ? job.qualifications
                : JSON.parse(job.qualifications)
                ).map((skill: string) => (
                <li key={skill} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                {skill}
                </li>
                ))}
            </ul>
            </section>
            )}
            <button className="mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition cursor-pointer">
            <span className="flex items-center gap-2 justify-center">
            <Send className="w-5 h-5" />
            Apply Now
            </span>
            </button>
        </div>
    )
}