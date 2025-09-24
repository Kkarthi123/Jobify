"use client";

import React, { use, useState } from "react";
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
    const role = useJobstore((state) => state.user?.role);
    const email = useJobstore((state) => state.user?.email!);
    const [open, setOpen] = useState(false);

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
                    item.Role.includes(role!) && (
                        <Link
                            href={item.link}
                            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                            title={item.tooltip}
                            key={item.id}
                        >
                            {item.icon}
                            <span className="hidden sm:inline">{item.title}</span>
                        </Link>
                    )
                ))}

                <div className="relative text-left flex group">
                    <button
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                    >
                        <div className="flex items-center justify-center cursor-pointer">
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&size=35&background=2171ff&color=ffffff&rounded=true`}
                            alt={`${email} avatar`}
                            className="w-[35px] h-[35px] rounded-full object-cover bg-gray-100 border-[2px] border-[#2171ff5c]"
                        />
                        </div>
                    </button>

                    <div className="absolute right-0 mt-2 top-[30px] w-56 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                        <div className="px-4 py-3 border-b border-gray-200">
                            <p className="text-gray-900 font-semibold">{email}</p>
                            <p className="text-gray-500 text-sm">{role}</p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center cursor-pointer gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

