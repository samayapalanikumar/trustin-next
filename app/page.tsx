'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the '/dashboard' route when the component mounts
    router.push('/dashboard');
  }, []);

  // This component doesn't need to render anything as it redirects immediately
  return null;

}
