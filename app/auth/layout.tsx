import AuthGuard from "@/components/AuthGuard";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        {children}
      </div>
    </AuthGuard>
  );
}