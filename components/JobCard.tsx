import Link from "next/link";
import { JobCardProps } from "../types/index";
import { ArrowRight } from "lucide-react";

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="">
    <Link
      href={`/jobs/${job.id}`}
      className="w-full sm:w-[360px] md:w-[400px] lg:w-[440px] group"
      style={{ textDecoration: "none" }}
    >
      <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-white to-purple-50 border border-blue-100 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group-hover:border-blue-400">
        <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-blue-900 group-hover:text-purple-700 transition-colors">
            {job.title}
          </h2>
          <span title={job.employment_type} className="inline-block bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-semibold shadow whitespace-nowrap max-w-24 overflow-hidden text-ellipsis ">
            {job.employment_type || "Full Time"}
          </span>
        </div>
        <p className="text-blue-700 font-semibold mb-1">{job.company}</p>
        <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-400 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0 4.314-6 10-6 10z" />
            <circle cx="12" cy="11" r="2" />
          </svg>
          {job.location}
        </p>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{job.description}</p>
        <div className="mt-auto">
          <span className="font-semibold group-hover:underline text-[#3f5fcd]">
            View Details <ArrowRight className="inline w-4 h-4 ml-1 text-[#3f5fcd]" />
          </span>
        </div>
        </div>
      </div>
    </Link>
    </div>
  );
}