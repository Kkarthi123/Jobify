"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { Auth, Database } from "@/config/firebase";
import { useJobstore } from "@/store/jobStore";
import { doc, getDoc } from "firebase/firestore";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname()
  const setUser = useJobstore((state) => state.setUser);

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(Auth, async (firebaseUser) => {
    try {
      if (firebaseUser) {
        const snap = await getDoc(doc(Database, "users", firebaseUser.uid));
        if (snap.exists()) {
          const userData = snap.data();
          setUser({
            userId: userData.uid,
            email: userData.email,
            role: userData.role,
          });
        }
        if (pathname.startsWith("/auth")) router.push("/job/jobs");
      } else {
        if (!pathname.startsWith("/auth")) router.push("/auth/login");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // ensure loading stops
    }
  });

  return () => unsubscribe();
  }, [router, pathname]);



  if(loading){
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-6"></div>
        <span className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          Loading, please wait...
        </span>
      </div>
    )
  }

  

  return <>{children}</>;
}
