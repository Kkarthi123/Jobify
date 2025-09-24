"use client";
import JobCard from "@/components/JobCard";
import Pagination from "@/components/Pagination";
import { useJobstore } from "@/store/jobStore";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Ban, Building, ChevronDown, MapPin, RotateCcw, Search } from "lucide-react";

const PAGE_SIZE = 20;

export default function Jobs() {
    const { jobs, isPending } = useJobstore();
    const [page, setPage] = useState(1);

    // Filter states
    const [type, setType] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [search, setSearch] = useState("");

    // Extract unique filter options
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

    // Filter jobs
    const filteredJobs = useMemo(() => {
        return jobs.filter(job =>
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
    }

    const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE);
    const paginatedJobs = filteredJobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handlePrev = () => setPage((p) => Math.max(1, p - 1));
    const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

    return (
        <div className="mx-auto px-4 py-10">
            {/* Header */}
            <div
                className="mb-8 rounded-xl overflow-hidden relative flex items-center justify-center min-h-[220px] shadow-lg"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80')",
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

            {/* Filters */}
            <div className="sticky top-[56px] z-20 bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between border border-blue-100">
                <div className="flex flex-wrap gap-4 w-full md:w-auto">
                    {/* Search Input */}
                    <div className="flex flex-col min-w-[250px] max-w-[350px]">
                        <label className="flex items-center gap-1 text-xs font-bold text-blue-900 mb-1 tracking-wide uppercase">
                            <span className="text-blue-400">
                                <Search size={14} />
                            </span>
                            Search
                        </label>
                        <input
                            type="text"
                            className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-blue-900 font-medium focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                            placeholder="Search jobs, companies, locations..."
                            value={search}
                            onChange={e => { setSearch(e.target.value); setPage(1); }}
                        />
                    </div>
                    {/* Type Filter */}
                    <div className="flex flex-col min-w-[120px] max-w-[300px]">
                        <label className="flex items-center gap-1 text-xs font-bold text-blue-900 mb-1 tracking-wide uppercase">
                            <ChevronDown size={14} className="text-blue-400" />
                            Type
                        </label>
                        <div className="relative">
                            <select
                                className="appearance-none w-full rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 pr-8 text-blue-900 font-medium focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition max-h-40 overflow-y-auto"
                                value={type}
                                onChange={e => { setType(e.target.value); setPage(1); }}
                                style={{ maxHeight: 160 }}
                            >
                                <option value="">All</option>
                                {types.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-blue-400">
                                <ChevronDown size={18} />
                            </span>
                        </div>
                    </div>
                    {/* Company Filter */}
                    <div className="flex flex-col min-w-[120px] max-w-[300px]">
                        <label className="flex items-center gap-1 text-xs font-bold text-blue-900 mb-1 tracking-wide uppercase">
                            <span className="text-blue-400">
                                <Building size={14} />
                            </span>
                            Company
                        </label>
                        <div className="relative">
                            <select
                                className="appearance-none w-full rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 pr-8 text-blue-900 font-medium focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition max-h-40 overflow-y-auto"
                                value={company}
                                onChange={e => { setCompany(e.target.value); setPage(1); }}
                                style={{ maxHeight: 160 }}
                            >
                                <option value="">All</option>
                                {companies.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-blue-400">
                                <ChevronDown size={18} />
                            </span>
                        </div>
                    </div>
                    {/* Location Filter */}
                    <div className="flex flex-col min-w-[120px] max-w-[300px]">
                        <label className="flex items-center gap-1 text-xs font-bold text-blue-900 mb-1 tracking-wide uppercase">
                            <span className="text-blue-400">
                                <MapPin size={14} />
                            </span>
                            Location
                        </label>
                        <div className="relative">
                            <select
                                className="appearance-none w-full rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 pr-8 text-blue-900 font-medium focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition max-h-30 overflow-y-auto"
                                value={location}
                                onChange={e => { setLocation(e.target.value); setPage(1); }}
                                style={{ maxHeight: 160 }}
                            >
                                <option value="">All</option>
                                {locations.map(l => (
                                    <option key={l} value={l}>{l}</option>
                                ))}
                            </select>
                            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-blue-400">
                                <ChevronDown size={18} />
                            </span>
                        </div>
                    </div>
                </div>
                {/* Reset Filters Button */}
                <button
                    className="cursor-pointer mt-2 md:mt-0 px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold shadow hover:from-blue-700 hover:to-blue-600 transition-all duration-150 text-sm flex items-center gap-2"
                    onClick={clearFilters}
                    title="Reset Filters"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                </button>
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
            ) : (
                <>
                    {filteredJobs.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="flex flex-col items-center justify-center h-64">
                                <Ban className="w-16 h-16 text-gray-400 mb-4" />
                                <span className="text-2xl font-semibold text-gray-500 mb-2">Job not found</span>
                                <p className="text-gray-400">The job you are looking for does not exist or has been removed.</p>
                                <div onClick={clearFilters} className="cursor-pointer mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
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
                </>
            )}
        </div>
    );
}
