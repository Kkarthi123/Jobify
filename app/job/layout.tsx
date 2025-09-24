import AuthGuard from "@/components/AuthGuard";
import NavBar from "@/components/NavBar";

export default function JobLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
       <AuthGuard>
            <div className="sticky top-0 z-50 bg-white">
            <NavBar />
            </div>
            {children}
       </AuthGuard>
    </>
  );
}