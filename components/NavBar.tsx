"use client";

import React, { use } from "react";
import Link from "next/link";
import { Briefcase, LogOut } from "lucide-react";
import navBarConfig from "../config/nav-bar-config";
import { useJobstore } from "@/store/jobStore";
import { signOut } from "firebase/auth";
import { Auth } from "@/config/firebase";
import { useRouter } from "next/navigation";

export default function  NavBar(){
    const logOut = useJobstore((state) => state.logout);
    const router = useRouter();

    const handleLogout = async() => {
        try {
            signOut(Auth); 
            logOut();
            router.push("/auth/login"); 
        } catch (err) {
            console.error("Error logging out:", err);
        }
        };

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
            <button
                className="flex cursor-pointer items-center gap-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-medium px-4 py-2 rounded-md border border-red-200"
                onClick={handleLogout}
                title="Logout"
            >
                <LogOut className="text-red-600" size={20} />
                <span className="hidden sm:inline">Logout</span>
            </button>
            </div>
        </nav>
    );
};

