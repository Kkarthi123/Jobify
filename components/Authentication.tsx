'use client';
import React, { useState } from "react";
import { Role, AuthData } from "@/types";
import Link from "next/link";
import AsyncButton from "./AsyncButton";
import { Eye, EyeOff } from "lucide-react";


type AuthProps = {
    mode: "login" | "register";
    onSubmit: (data: AuthData, callback: (err:any) => void) => void;
    error?: string;
};

const roles = [
    { label: "User", value: Role.User },
    { label: "Recruiter", value: Role.Recruiter },
];

export default function Authentication({ mode, onSubmit, error }: AuthProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<Role>(Role.User);
    const [showPassword, setShowPassword] = useState(false);
    const [isAuthRunning, setIsAuthRunning] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        if (!email || !password || (mode === "register" && !role)) {
            alert("Please fill all fields.");
            return;
        }
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) == false) {
            alert("Please enter a valid email.");
            return;
        }
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password) == false && mode === "register") {
            alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.");
            return;
        }
        setIsAuthRunning(true);
        onSubmit({ email, password, ...(mode === "register" ? { role } : {}) }, (err)=>{
            setIsAuthRunning(false);
            if (err) {
                alert(err.message);
            }
        });
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="shadow-md rounded-lg px-5 py-8 pb-7 w-[370px] bg-white">
                <div className="mb-7 text-center">
                    <span className="text-xl font-bold bg-[linear-gradient(45deg,#3f71dd,#c06dff)] bg-clip-text text-transparent">{mode === "login" ? "Login" : "Register"} with Jobify</span>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-5">
                    <label htmlFor="email" className="block text-[15px] font-medium text-gray-500">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full p-2.5 outline-none focus-within:border-gray-400" placeholder="Enter Email" required />
                </div>
                <div className={`flex flex-col ${mode === "register" ? "mb-5" : "mb-10"}`}>
                    <label htmlFor="password" className="block text-[15px] font-medium text-gray-500">Password</label>
                    <div className='bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg w-full p-2.5 flex place-items-center'>
                        <input 
                        {...(mode === "register" ? { pattern: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" } : {})}
                        title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters" 
                        type={showPassword ? "text" : "password"} 
                        id="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        className=" outline-none focus-within:border-gray-400 w-full" 
                        placeholder="Enter Password" 
                        required 
                        minLength={8} 
                        />
                        {password && (
                            <span onClick={() => setShowPassword((prev) => !prev)} className="cursor-pointer">
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </span>
                        )}
                    </div>
                </div>
                {mode === "register" && (
                    <div className="mb-10">
                        <label className="block text-[15px] font-medium text-gray-500">
                            Role
                        </label>
                        <div className="flex gap-4">
                            {roles.map(r => (
                                <label key={r.value} className="flex items-center gap-2 text-gray-500">
                                    <input
                                        type="radio"
                                        name="role"
                                        value={r.value}
                                        checked={role === r.value}
                                        onChange={() => setRole(r.value as Role)}
                                        className="accent-blue-600"
                                    />
                                    {r.label}
                                </label>
                            ))}
                        </div>
                    </div>
                )}
                <div>
                    <AsyncButton buttonType="submit" buttonName={mode === "login" ? "Login" : "Register"} customButtonClass="p-2 bg-[#1a5ff5] w-full rounded-md text-white hover:bg-[#1850c9]" isActionRunning={isAuthRunning}/>
                </div>
                </form>
                <div className='mt-3 text-[13px]'>
                 <span>{mode === "login" ? "New here?" : "Already have an account?"} <Link href={mode === "login" ? "/auth/register" : "/auth/login"} className='underline text-blue-500 hover:text-blue-600'>{mode === "login" ? "Sign Up." : "Login."}</Link></span>
                </div>
            </div>
        </div>
        
    );
}
