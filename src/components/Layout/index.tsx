import Navbar from "../Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <main className="max-w-[1110px] mx-auto">
      <Navbar />
      <div>{children}</div>
    </main>
  );
}
