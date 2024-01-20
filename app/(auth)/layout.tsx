"use client";
import "../../globals.css";
import "../../satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";

export default function RootLayout({
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
        <div className="flex h-screen overflow-hidden">
          <main>
            <div className="mx-auto max-w-screen-2xl">{children}</div>
          </main>
        </div>
      )}
    </div>
  );
}
