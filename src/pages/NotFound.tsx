import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-[100svh] grid place-items-center pt-24">
      <div className="container max-w-xl text-center">
        <div className="font-mono-tel text-[10px] tracking-[0.4em] text-accent mb-4">▸ SIGNAL LOST</div>
        <h1 className="font-display text-7xl md:text-9xl text-gradient-aurora">404</h1>
        <p className="mt-4 text-muted-foreground">This coordinate doesn't exist in our field.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-3 rounded-md border border-primary bg-primary px-6 py-3 font-mono-tel text-xs uppercase tracking-[0.25em] text-primary-foreground hover:shadow-glow-orange"
        >
          ◇ RETURN TO CORE
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
