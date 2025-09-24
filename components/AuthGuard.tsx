"use client";


import { useRouter } from "next/navigation";
import { useJobstore } from "@/store/jobStore";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isLoggedIn = useJobstore((state) => state.isLoggedIn);

  // useEffect ensures router.push happens after render
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/auth/login"); // replace avoids adding extra history entry
    }
  }, [isLoggedIn, router]);

  // Return null instead of loading to avoid flicker
  if (!isLoggedIn) return null;

  return <>{children}</>;
}
