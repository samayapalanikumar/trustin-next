"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {loading ? (
        <Loader />
      ) : (
        <div className="grid items-center justify-items-center h-screen overflow-hidden">
          <main>
            <div className="mx-auto max-w-screen-2xl">{children}</div>
          </main>
          <Toaster position="top-right" richColors  />
        </div>
      )}
    </div>
  );
}
