"use client";

import { useEffect, useState } from "react";
import { signInAnonymously } from "firebase/auth";
import { Auth } from "@/config/firebase";

export default function TestFirebase() {
  const [message, setMessage] = useState("Checking Firebase...");

  useEffect(() => {
    signInAnonymously(Auth)
      .then(() => setMessage("✅ Firebase Auth is working!"))
      .catch((err) => setMessage("❌ Firebase error: " + err.message));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Firebase Test</h1>
      <p>{message}</p>
    </div>
  );
}
