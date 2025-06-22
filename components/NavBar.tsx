import React from "react";
import Link from "next/link";
import { Briefcase, PlusCircle } from "lucide-react";
import navBarConfig from "../config/nav-bar-config";

export default function  NavBar(){
    return (
        <nav className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center gap-2">
                <Briefcase className="text-blue-600" size={28} />
                <span className="text-2xl font-bold text-gray-800 tracking-tight">
                    Jobify
                </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
            {navBarConfig.map((item) => (
                <Link
                href={item.link}
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                title={item.tooltip}
                key={item.id}
                >
                {item.icon}
                <span className="hidden sm:inline">{item.title}</span>
                </Link>
            ))}               
            </div>
        </nav>
    );
};

