"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";

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
        <div className="h-screen overflow-hidden grid items-center justify-items-center">
          <main className="lg:w-full lg:h-full">
            <div className="mx-auto lg:w-full lg:h-full">{children}</div>
          </main>
        </div>
      )}
    </div>
  );
}
