"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { Auth } from "@/config/firebase";
import { useJobstore } from "@/store/jobStore";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname()
  const setUser = useJobstore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (firebaseUser) => {
      try{
        if (firebaseUser) {
          const appUser = {
            userId: firebaseUser.uid,
            email: firebaseUser.email,
          };
          setUser(appUser);
          if (pathname.startsWith('/auth')) {
            router.push("/job/jobs"); 
          }
          setLoading(false);
        } else {
          router.push("/auth/login"); 
        }
      }catch(err){
        console.error("Error in auth state change:", err);
      }finally{
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);


  if(loading){
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-6"></div>
        <span className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Loading, please wait...
        </span>
      </div>
    )
  }

  

  return <>{children}</>;
}
