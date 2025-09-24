import NavBar from "@/components/NavBar";

export default function JobLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sticky top-0 z-50 bg-white">
        <NavBar />
      </div>
      {children}

    </>
  );
}