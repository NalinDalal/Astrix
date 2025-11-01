"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UnAuthorised() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 2000); // wait 2 seconds before redirect
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-2">Unauthorized Access</h1>
      <p className="text-gray-600">Redirecting you to the homepage...</p>
    </div>
  );
}
