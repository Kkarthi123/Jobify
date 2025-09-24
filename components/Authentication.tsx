'use client';
import React, { useState } from "react";
import { Role, AuthData } from "@/types";


type AuthProps = {
    mode: "login" | "register";
    onSubmit: (data: AuthData) => void;
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
    const [localError, setLocalError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        if (!email || !password || (mode === "register" && !role)) {
            setLocalError("Please fill all fields.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setLocalError("Please enter a valid email.");
            return;
        }
        if (password.length < 6) {
            setLocalError("Password must be at least 6 characters.");
            return;
        }
        onSubmit({ email, password, ...(mode === "register" ? { role } : {}) });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 rounded-2xl shadow-lg bg-white font-sans">
            <h2 className="text-center mb-6 text-2xl font-semibold">
                {mode === "login" ? "Login" : "Register"}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block mb-1 font-medium"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        required
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                        title="Please enter a valid email address."
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block mb-1 font-medium"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        autoComplete={mode === "login" ? "current-password" : "new-password"}
                        value={password}
                        required
                        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
                        title="Password must be at least 6 characters, contain letters and numbers."
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                </div>
                {mode === "register" && (
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">
                            Role
                        </label>
                        <div className="flex gap-4">
                            {roles.map(r => (
                                <label key={r.value} className="flex items-center gap-2">
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
                {(localError || error) && (
                    <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4 text-sm text-center">
                        {localError || error}
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg cursor-pointer shadow transition-colors hover:bg-blue-700"
                >
                    {mode === "login" ? "Login" : "Register"}
                </button>
            </form>
        </div>
    );
}
