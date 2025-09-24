"use client";

import JobCard from "@/components/JobCard";
import Pagination from "@/components/Pagination";
import { useJobstore } from "@/store/jobStore";
import { useState, useMemo } from "react";
import { Ban, Building, ChevronDown, MapPin, ListFilter, X, Search} from "lucide-react";

const PAGE_SIZE = 20;

export default function Jobs() {
  const { jobs, isPending } = useJobstore();
  const [page, setPage] = useState(1);

  // Filters
  const [type, setType] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique options
  const { types, companies, locations } = useMemo(() => {
    const typesSet = new Set<string>();
    const companiesSet = new Set<string>();
    const locationsSet = new Set<string>();
    for (const job of jobs) {
      if (job.employment_type) typesSet.add(job.employment_type);
      if (job.company) companiesSet.add(job.company);
      if (job.location) locationsSet.add(job.location);
    }
    return {
      types: Array.from(typesSet),
      companies: Array.from(companiesSet),
      locations: Array.from(locationsSet),
    };
  }, [jobs]);

  // Count of active filters
  const activeFiltersCount = [type, company, location].filter(Boolean).length;

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) =>
      (type ? job.employment_type === type : true) &&
      (company ? job.company === company : true) &&
      (location ? job.location === location : true) &&
      (search
        ? (
            job.title?.toLowerCase().includes(search.toLowerCase()) ||
            job.company?.toLowerCase().includes(search.toLowerCase()) ||
            job.location?.toLowerCase().includes(search.toLowerCase()) ||
            job.description?.toLowerCase().includes(search.toLowerCase())
          )
        : true
      )
    );
  }, [jobs, type, company, location, search]);

  const clearFilters = () => {
    setType("");
    setCompany("");
    setLocation("");
    setSearch("");
    setPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE);
  const paginatedJobs = filteredJobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="mx-auto px-4 py-10">

      <div
        className="mb-8 rounded-xl overflow-hidden relative flex items-center justify-center min-h-[220px] shadow-lg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#233364ed]"></div>
        <div className="relative z-10 text-center p-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">Job Board</h1>
          <p className="text-lg md:text-xl text-blue-100 font-medium drop-shadow">
            Discover your next opportunity with <span className="font-bold text-white">Jobify</span> – where top talent meets top jobs!
          </p>
        </div>
      </div>


      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">

        <div className="relative">

            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Search size={16}/>
            </div>

            <input
                type="text"
                placeholder="Search jobs, companies, locations..."
                value={search}
                onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
                }}
                className="w-full rounded-md border border-gray-300 bg-white pl-10 pr-10 py-[5px] text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
            />

            {/* Clear Button */}
            {search && (
                <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-all duration-150"
                aria-label="Clear search"
                >
                <X size={16} />
                </button>
            )}
            </div>



        {/* Filters Toggle */}
        <div className="relative group">
             {/* Filter Button */}
            <button
                className="flex items-center cursor-pointer gap-2 px-4 py-1 rounded-lg bg-blue-50 border border-gray-300 hover:bg-blue-100 transition"
            >
                Filters
                {activeFiltersCount > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">{activeFiltersCount}</span>
                )}
                <ListFilter size={16} />
            </button>

             {/* Filters Panel on Hover */}
            <div className="absolute left-0 top-[33px] w-72 bg-white border border-gray-300 rounded-lg shadow-lg p-4 space-y-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                {/* Type */}
                <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-sm font-medium">
                    <ChevronDown size={14} /> Type
                </label>
                <select
                    value={type}
                    onChange={(e) => { setType(e.target.value); setPage(1); }}
                    className="w-full cursor-pointer border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
                >
                    <option value="">All</option>
                    {types.map((t) => (
                    <option key={t} value={t}>{t}</option>
                    ))}
                </select>
                    {type && (
                        <button onClick={() => setType("")} className="text-xs text-blue-600 hover:underline mt-1 self-start">
                        Remove
                        </button>
                    )}
                </div>

                {/* Company */}
                <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-sm font-medium">
                    <Building size={14} /> Company
                </label>
                <select
                    value={company}
                    onChange={(e) => { setCompany(e.target.value); setPage(1); }}
                    className="w-full cursor-pointer border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
                >
                    <option value="">All</option>
                    {companies.map((c) => (
                    <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                {company && (
                    <button onClick={() => setCompany("")} className="text-xs text-blue-600 hover:underline mt-1 self-start">
                    Remove
                    </button>
                )}
                </div>

                {/* Location */}
                <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-sm font-medium">
                    <MapPin size={14} /> Location
                </label>
                <select
                    value={location}
                    onChange={(e) => { setLocation(e.target.value); setPage(1); }}
                    className="w-full cursor-pointer border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
                >
                    <option value="">All</option>
                    {locations.map((l) => (
                    <option key={l} value={l}>{l}</option>
                    ))}
                </select>
                    {location && (
                        <button onClick={() => setLocation("")} className="text-xs text-blue-600 hover:underline mt-1 self-start">
                            Remove
                        </button>
                    )}
                </div>

                {/* Reset All */}
                <button
                onClick={clearFilters}
                className="w-full mt-2 cursor-pointer px-3 py-2 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition"
                >
                Reset All
                </button>
            </div>
        </div>

       
      </div>

      {/* Job List */}
      {isPending ? (
        <div className="flex justify-center items-center h-40">
          <svg className="animate-spin h-8 w-8 text-blue-500 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <p className="text-gray-500 text-lg">Loading jobs...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-20">
          <div className="flex flex-col items-center justify-center h-64">
            <Ban className="w-16 h-16 text-gray-400 mb-4" />
            <span className="text-2xl font-semibold text-gray-500 mb-2">Job not found</span>
            <p className="text-gray-400">The job you are looking for does not exist or has been removed.</p>
            <div
              onClick={clearFilters}
              className="cursor-pointer mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Clear filter(s)
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {paginatedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <div className="flex justify-center mt-10 space-x-2">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              setPage={setPage}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          </div>
        </>
      )}
    </div>
  );
}
